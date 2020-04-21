import React, { Component } from 'react';
import Axios from "axios";
import Config from "../config/config.json";
import '../styles/main.scss';


class Main extends Component {
    state = {
        text: ""
    }
    componentDidMount = () => {
        let self = this;
        let token = localStorage.getItem('token');
        if(token == null){
            this.props.history.push('/en/login');
        }
        else {
            Axios.defaults.headers.common['x-access-token'] =  token;
            Axios.defaults.headers.common['Content-Type'] =  Config.axios.contentType;
            Axios.get(Config.urlbase+"auth/test", {}, {})
            .then(response => {
                if(response.data.message === 'ok'){
                    self.setState({
                        text: "Logged in with email " + response.data.data.email
                    })
                }  
                else self.props.history.push('/en/login'); 
            })
            .catch(error => {
                console.log("error");
            })
        }
    }
    logout = () => {
        localStorage.removeItem("token");
        this.props.history.push('/en/login');
    }
    render = () => {
        return (
            <div className="main">
                <div>{this.state.text}</div>
                <button className="waves-effect waves-light btn btn-large" onClick={this.logout}> Log Out </button>
            </div>
        )
    }    
}

export default Main;