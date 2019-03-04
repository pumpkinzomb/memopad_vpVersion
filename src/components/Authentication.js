import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/style.css';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleLogin() {
        let id = this.idInput.value;
        let pw = this.pwInput.value;
        
        this.props.onLogin(id, pw).then(
            (success) => {
                if(!success) {
                    this.pwInput.value= '';
                }
            }
        );
    }

    handleRegister() {
        let id = this.idInput.value;
        let pw = this.pwInput.value;

        this.props.onRegister(id, pw).then((result)=>{
            if(!result){
                this.idInput.value= '';
                this.pwInput.value= '';
            }
        });
    }

    handleKeyPress(e){
        if(e.key === 'Enter'){
            if(this.props.mode){
                this.handleLogin();
            }else{
                this.handleRegister();
            }
        }
    }

    render(){
        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        <div className="input-field col s12 username">
                            <label>Username</label>
                            <input
                            name="username"
                            type="text"
                            ref={ref=>{
                                this.idInput = ref;
                            }}
                            className="validate"/>
                        </div>
                        <div className="input-field col s12">
                            <label>Password</label>
                            <input
                            name="password"
                            type="password"
                            ref={ref=>{
                                this.pwInput = ref;
                            }}
                            onKeyPress={
                                this.handleKeyPress
                            }
                            className="validate"/>
                        </div>
                        <button type="button" className="waves-effect waves-light btn" onClick={this.handleLogin}>SUBMIT</button>
                    </div>
                </div>
                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

        const registerView = (
            <div className="card-content">
                <div className="row">
                    <div className="input-field col s12 username">
                        <label>Username</label>
                        <input
                        name="username"
                        type="text"
                        ref={ref=>{
                                this.idInput = ref;
                            }}
                        className="validate"/>
                    </div>
                    <div className="input-field col s12">
                        <label>Password</label>
                        <input
                        name="password"
                        type="password"
                        ref={ref=>{
                                this.pwInput = ref;
                            }}
                        onKeyPress={
                            this.handleKeyPress
                        }
                        className="validate"/>
                    </div>
                    <button type="button" className="waves-effect waves-light btn" onClick={this.handleRegister}>CREATE</button>
                </div>
            </div>
        );

        return (
            <div className="container auth">
                <Link className="logo" to="/">MEMOPAD</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    { this.props.mode ? loginView : registerView }
                </div>
            </div>
        );
    }
}

Authentication.propTypes = {
    mode: PropTypes.bool,
    onLogin: PropTypes.func,
    onRegister: PropTypes.func
}

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => {
        console.error("Login function is not defined.")
    },
    onRegister: (id,pw) => {
        console.error("Register function is not defined.")
    }
}

export default Authentication;