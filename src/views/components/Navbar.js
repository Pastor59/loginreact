import React, { Component } from 'react';
import {Link} from "react-router-dom";
import 'materialize-css/sass/materialize.scss';
import '../../styles/navbar.scss'; 

export class Navbar extends Component {
    state = {
        languageExpanded: false
    }
    handleLanguage = () => {
        if(this.state.languageExpanded){
            this.setState({
                languageExpanded: false
            });
        }
        else {
            this.setState({
                languageExpanded: true
            });
        }   
    }
    render() {
        const showLanguagePanel= 'card language-panel show-language-panel';
        const hideLanguagePanel= 'card language-panel hide-language-panel';
        const currentLanguage = this.props.currentLanguage;
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <ul className="right">
                            <li><Link to={this.props.text.login.links[currentLanguage]}>{this.props.text.navbar.login}</Link></li>
                            <li><Link to={this.props.text.newaccount.links[currentLanguage]}>{this.props.text.navbar.signup}</Link></li>
                            <li>
                                <div className="row language-icons" onClick={this.handleLanguage}>
                                    <div><i className="material-icons language">language</i></div>
                                    <div className={this.state.languageExpanded ? "expand-more-clicked": "expand-more"}><i className="material-icons" >expand_more</i></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="mobile">
                    <div className="row language-icons" onClick={this.handleLanguage}>
                        <div><i className="material-icons language">language</i></div>
                        <div className={this.state.languageExpanded ? "expand-more-clicked": "expand-more"}><i className="material-icons" >expand_more</i></div>
                    </div>
                </div>
                <div className={this.state.languageExpanded ? showLanguagePanel: hideLanguagePanel}>
                    <div className="card-content">
                        <ul>
                            <li><Link to={this.props.links.en}>{this.props.text.navbar.english}</Link></li>
                            <li><Link to={this.props.links.cat}>{this.props.text.navbar.catalan}</Link></li>
                            <li><Link to={this.props.links.es}>{this.props.text.navbar.spanish}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;