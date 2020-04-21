import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";
import QueryString from 'query-string';
import Config from "../config/config.json";
import Language from '../translation/Language';
import Navbar from './components/Navbar';
import Popup from './components/Popup';
import 'materialize-css/sass/materialize.scss';
import '../styles/login.scss';

class Login extends Component {
    constructor(props) {
        super(props)
        this.hidePopup = this.hidePopup.bind(this)
    }
    state = {
        email: "",
        password: "",
        textFail: "",
        showPopup: false,
        text: Language.getCurrentFromURL(this.props.match.url),
        currentLanguage: Language.getCurrentLanguageURL(this.props.match.url),
        popup: {
            link: "",
            text: ""
        }
    }
    componentDidMount = () => {
        let p = QueryString.parse(this.props.location.search).p;
        if(!!p) this.handleQueryParam(p);
        else this.loginFromToken();
    }
    handleKeyDown = (e) => {
        if(e.keyCode === 13) this.login();
    }
    hidePopup = () => {
        this.setState({
            showPopup: false   
        })
    }
    handleQueryParam = (p) => {
        let popupText;
        if(p === "useractivated") popupText = this.state.text.login.useractived;
        else if (p === "paramexpired") popupText = this.state.text.linkexpired;
        else popupText = this.state.text.login.error;
        this.setState({
            showPopup: true,
            popup: {
                link: this.state.text.login.links[this.state.currentLanguage],
                text: popupText
            }    
        })
    }
    loginFromToken = () => {
        let token = localStorage.getItem('token');
        if(token != null){
            let self = this;
            Axios.defaults.headers.common['x-access-token'] =  token;
            Axios.defaults.headers.common['Content-Type'] =  Config.axios.contentType;
            Axios.get(Config.urlbase+"auth/test", {}, {})
            .then(response => {
                if(response.data.message === 'ok'){
                    self.props.history.push('/'); 
                }  
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value        
        })
    }
    handleChangePassword = (e) => {
        this.setState({
          password: e.target.value
        });
    }
    login = () => {
        let self = this;
        Axios.defaults.headers.common['Content-Type'] =  Config.axios.contentType;
        Axios.post(Config.urlbase+"auth/login", {}, {
            params: {
                email: self.state.email,
                password: self.state.password
            }   
        })
        .then((response) => {
            if(response.data.message === 'token'){
                localStorage.setItem('token', response.data.data);
                self.props.history.push('/');
            }
            else if(response.data.message === 'wrongcredentials' || response.data.message === 'usernotexists') {
                self.setState({
                    textFail: self.state.text.login.wrongUserPwd
                })
            }
            else if(response.data.message === 'checkyouremail') {
                self.setState({
                    textFail: self.state.text.login.checkemail
                })
            }
            else if(response.data.message === 'servererror') {
                self.setState({
                    textFail: self.state.text.failResponse
                })
            }
            this.setState({
                password: ""
            });
        })
        .catch(error => {
            self.setState({
                password: "",
                textFail: self.state.text.failResponse
            })
        })
    }
    render() {
        return (
            <div className="login-container">
                <Navbar {...this.state} links={this.state.text.login.links}/>
                <div className='row valign-wrapper'>
                    <div className='col l4 m6 s10 card offset-l4 offset-m3 offset-s1'>
                        <div className='card-content'>
                            <div className="row">
                                <div className="input-field col l12 m12 s12">
                                    <input placeholder={this.state.text.login.email} id="email" type="email" className="validate" onChange= {this.handleChangeEmail} value={this.state.email}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col l12 m12 s12">
                                    <input placeholder={this.state.text.login.password} id="password" type="password" className="validate" onChange = {this.handleChangePassword} value={this.state.password}/>
                                </div>
                            </div>
                            <div className={this.state.textFail.length > 0 ? 'row text-fail' : 'hidden'}>
                                <div className="col l12 m12 s12">
                                    <p> {this.state.textFail} </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col l12 m12 s12">
                                    <button onClick={this.login} onKeyPress={this.handleKeyDown} className="waves-effect waves-light btn btn-large">{this.state.text.login.login}</button>
                                </div>
                            </div>
                            <div className="row create-account-text">
                                <div className="col l12 m12 s12">
                                    <p>{this.state.text.login.notregistered}&nbsp;</p><Link to={this.state.text.newaccount.links[this.state.currentLanguage]}>{this.state.text.login.newaccount}</Link>
                                </div>
                            </div>
                            <div className="row recover-password-text">
                                <div className="col l12 m12 s12">
                                    <p>{this.state.text.login.forgotpassword}&nbsp;</p><Link to={this.state.text.recoverpassword.links[this.state.currentLanguage]}>{this.state.text.login.clickhere}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Popup {...this.state} hidePopup={this.hidePopup}/>
            </div>
        )
    }
}

export default Login;