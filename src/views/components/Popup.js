import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../../styles/popup.scss'; 

export class Popup extends Component {
    render() {
        return (
            <div className={this.props.showPopup ? "popup": "hidden"}>
                <div className='row'>
                    <div className='col s12 m6 l4 offset-l4 offset-m3 offset-l4'>
                        <div className="card">
                            <div className='card-content'>
                                <div className="popup-text">{this.props.popup.text}</div>
                                <Link onClick={this.props.hidePopup} to={this.props.popup.link} className="waves-effect waves-light btn-large">{this.props.text.popup.agree}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Popup;