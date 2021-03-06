import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";
import Config from "../config/config.json"
import Language from '../translation/Language'
import Navbar from './components/Navbar';
import Popup from './components/Popup';
import 'materialize-css/sass/materialize.scss';
import '../styles/createAccount.scss';

export class CreateAccount extends Component {
    constructor(props){
        super(props);
        let text = Language.getCurrentFromURL(this.props.match.url);
        let currentLanguage = Language.getCurrentLanguageURL(this.props.match.url);
        this.state = {
            text: text,
            currentLanguage: currentLanguage,
            email: '',
            password: '',
            repeatedPassword: '',
            showPopup: false,
            textFailResponse: '',
            popup: {
                link: text.login.links[currentLanguage],
                text: text.newaccount.checkemail
            }
        }
        this.hidePopup = this.hidePopup.bind(this)
    }
    handleKeyDown = (e) => {
        if(e.keyCode === 13) this.createAccount();
    }
    hidePopup = () => {
        this.setState({
            showPopup: false   
        })
    }
    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
            textFailResponse: ""
        });
    }
    handleChangePassword = (e) => {
        this.setState({
          password: e.target.value,
          textFailResponse: ""
        });

    }
    handleChangeRepeatedPassword = (e) => {
        this.setState({
            repeatedPassword: e.target.value,
            textFailResponse: ""
        });
    };
    matchPasswords = () => {return this.state.password === this.state.repeatedPassword};
    isPasswordTooShort = () => {return this.state.password.length >= 7};
    isValidEmail = () => {return (this.state.email.includes("@") && this.state.email.includes("."))};
    isPasswordEmpty = () => {return (this.state.password.length === 0)};
    isEmailEmpty = () => {return (this.state.email.length === 0)};
    isDataCorrect = () => {
        return (this.matchPasswords() && this.isPasswordTooShort() && this.isValidEmail() &&
                !this.isPasswordEmpty() && !this.isEmailEmpty()) 
        };
    createAccount = () => {
        var self = this;
        Axios.defaults.headers.common['Content-Type'] =  Config.axios.contentType;
        Axios.post(Config.urlbase+"auth/createnewuser", {}, {
            params: {
                email: self.state.email,
                password: self.state.password,
                passwordrepeated: self.state.repeatedPassword
            }
        })
        .then((response) => {
            if(response.data.status === 201){
                self.setState({
                    showPopup: true
                })
            }
            else if(response.data.message === "usernalreadyexists") {
                self.setState({
                    textFailResponse: self.state.text.newaccount.emailexists
                })
            }
            else {
                self.setState({
                    textFailResponse: self.state.text.failResponse
                })
            }
        })
        .catch(function (error) {
            self.setState({
                textFailResponse: self.state.text.failResponse
            })
        });
    };
    render() {
        return (
            <div className="create-account-container">
                <Navbar {...this.state} links={this.state.text.newaccount.links}/>
                <div className='row valign-wrapper'>
                    <div className='col l4 m6 s10 card offset-l4 offset-m3 offset-s1'>
                        <div className='card-content'>
                            <div className="row left">
                                <Link to={this.state.text.login.links[this.state.currentLanguage]}><i className="material-icons back-arrow">keyboard_backspace</i></Link>
                            </div>
                            <div className="row">
                                <div className="input-field col l12 m12 s12">
                                    <input placeholder={this.state.text.newaccount.email}  onBlur= {this.handleChangeEmail} id="email" type="email" className="validate"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col l12 m12 s12">
                                    <input placeholder={this.state.text.newaccount.password} id="password" type="password" className="validate" onBlur= {this.handleChangePassword}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="input-field col l12 m12 s12">
                                    <input placeholder={this.state.text.newaccount.repeatpassword} id="repeated_password" type="password" className="validate" onChange= {this.handleChangeRepeatedPassword}/>
                                </div>
                            </div>
                            <div className={this.isEmailEmpty() || this.isValidEmail() ? 'hidden' : 'row text-fail'}>
                                <div className="col l12 m12 s12">
                                    <p> {this.state.text.newaccount.invalidemail} </p>
                                </div>
                            </div>
                            <div className={this.isPasswordEmpty() || this.isPasswordTooShort() ? 'hidden' : 'row text-fail'}>
                                <div className="col l12 m12 s12">
                                    <p> {this.state.text.newaccount.pwdlength} </p>
                                </div>
                            </div>
                            <div className={this.isPasswordEmpty() || this.matchPasswords() ? 'hidden' : 'row text-fail'}>
                                <div className="col l12 m12 s12">
                                    <p> {this.state.text.newaccount.pwdmatch} </p>
                                </div>
                            </div>
                            <div className={this.state.textFailResponse.length === 0 ? 'hidden' : 'row text-fail'}>
                                <div className="col l12 m12 s12">
                                    <p> {this.state.textFailResponse} </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col l12 m12 s12">
                                    <button className={this.isDataCorrect() ? 'button btn-large' : 'button btn-large disabled' } onClick={this.createAccount} onKeyPress={this.handleKeyDown}>{this.state.text.newaccount.newaccount}</button>
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

export default CreateAccount;