import React, { Component } from 'react';
import {Route, BrowserRouter}  from 'react-router-dom';
import Main from './views/Main';
import Login from './views/Login';
import CreateAccount from './views/CreateAccount';
import RecoverPassword from './views/RecoverPassword';
import EmailRecoverPassword from './views/EmailRecoverPassword';
import './styles/base.scss'; 

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>

                    <Route exact path='/' component={Main}/>

                    <Route exact path='/en/login' component={Login}/>
                    <Route exact path='/cat/inicisessio' component={Login}/>
                    <Route exact path='/es/inciarsesion' component={Login}/>

                    <Route exact path='/createaccount' component={CreateAccount}/>
                    <Route exact path='/en/createaccount' component={CreateAccount}/>
                    <Route exact path='/cat/noucompte' component={CreateAccount}/>
                    <Route exact path='/es/crearcuenta' component={CreateAccount}/>

                    <Route exact path='/recoverpassword' component={RecoverPassword}/>
                    <Route exact path='/en/recoverpassword' component={RecoverPassword}/>
                    <Route exact path='/cat/recuperarcontrasenya' component={RecoverPassword}/>
                    <Route exact path='/es/recuperarcontrasena' component={RecoverPassword}/>

                    <Route exact path='/emailrecoverpassword' component={EmailRecoverPassword}/>
                    <Route exact path='/en/emailrecoverpassword' component={EmailRecoverPassword}/>
                    <Route exact path='/cat/correurecuperarcontrasenya' component={EmailRecoverPassword}/>
                    <Route exact path='/es/correorecuperarcontrasena' component={EmailRecoverPassword}/>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;
