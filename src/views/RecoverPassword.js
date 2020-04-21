import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";
import Config from "../config/config.json";
import Language from '../translation/Language';
import Navbar from './components/Navbar';
import Popup from './components/Popup';
import 'materialize-css/sass/materialize.scss';
import '../styles/recoverpassword.scss';

class RecoverPassword extends Component {
    constructor(props){
        super(props);
        let text = Language.getCurrentFromURL(this.props.match.url);
        let currentLanguage = Language.getCurrentLanguageURL(this.props.match.url);
        this.state = {
            text: text,
            currentLanguage: currentLanguage,
            email: "",
            textFailResponse: "",
            showPopup: false,
            popup: {
                link: text.login.links[currentLanguage],
                text: text.recoverpassword.checkemail
            }
        }
        this.hidePopup = this.hidePopup.bind(this)
    }
    handleKeyDown = (e) => {
        if(e.keyCode === 13) this.recoverPwd();
    }
    hidePopup = () => {
        this.setState({
            showPopup: false   
        })
    }
    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    recoverPwd = (e) => {
        let self = this;
        Axios.defaults.headers.common['Content-Type'] =  Config.axios.contentType;
        Axios.post(Config.urlbase+"auth/recoverpassword", {}, {
            params: {
                email: this.state.email
            }   
        })
        .then(response => {
            console.log(response);
            if(response.data.message === "ok") {
                self.setState({
                    showPopup: true,
                    textFailResponse: ""
                })
            }
            else if(response.data.message === "usernotexists") {
                self.setState({
                    textFailResponse: self.state.text.recoverpassword.emailnotexists
                })
            }
            else {
                self.setState({
                    textFailResponse: self.state.text.failResponse
                })
            }
        })
        .catch(error => {
            self.setState({
                textFailResponse: self.state.text.failResponse
            })
        })
    }
    render() {
        return (
            <div className="recover-password-container">
                <Navbar text = {this.state.text} links={this.state.text.recoverpassword.links} currentLanguage={this.state.currentLanguage}/>
                <div className='row valign-wrapper'>
                    <div className='col l4 m6 s10 card offset-l4 offset-m3 offset-s1'>
                        <div className='card-content'>
                            <div className="row left">
                                <Link to={this.state.text.login.links[this.state.currentLanguage]}><i className="material-icons back-arrow">keyboard_backspace</i></Link>
                            </div>
                            <div className="row">
                                <div className="input-field col l12 m12 s12">
                                    <input placeholder={this.state.text.recoverpassword.email} onChange={this.handleEmail} id="user_name" type="email" className="validate"/>
                                </div>
                            </div>
                            <div className={this.state.textFailResponse.length === 0 ? 'hidden' : 'row text-fail'}>
                                <div className="col l12 m12 s12">
                                    <p> {this.state.textFailResponse} </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col l12 m12 s12">
                                    <button onClick={this.recoverPwd} onKeyPress={this.handleKeyDown} className="waves-effect waves-light btn-large">{this.state.text.recoverpassword.recoverpassword}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Popup {...this.state}/>
            </div>
        )
    }
}

export default RecoverPassword;
