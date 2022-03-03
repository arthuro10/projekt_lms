import React from "react";

import { Link } from "react-router-dom";



export default class Register_Form extends React.Component {       
        constructor(props) {
            super(props);
            this.baseURL = 'http://localhost:3000/';
    
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                resultInfo: "",
            };
            
        }
    
        componentDidMount() {
            if(localStorage.loginId) {
                window.location.href = '/';
            }
        }
    
        handleSubmit(event) {
            event.preventDefault();
    
            const currentForm = event.target;
            const tmpFormData = new FormData(currentForm);
            const data = {
                userName: tmpFormData.get('NameOrEmail'),
                userPassword: tmpFormData.get('Password'),
                userPasswordConfirm: tmpFormData.get('PasswordConfirm')
            };
    
            fetch(this.baseURL+'api/login/signup/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(
                result => {
                    this.setState({resultInfo: result.info});
    
                    if(!result.err) {
                        console.log("Erfolg!")
                        currentForm.reset();
                        window.location.href = '/#/login';
                    }
                },
                (error) => {
                    console.log("Error: " + JSON.stringify(error));
                }
            );
        }

        btnClick () {
            window.location.href = '/#/login';
        }

    render() {
        const {resultInfo} = this.state;
        const normalP = <div>
                            <p>Hier können Sie einen Account anlegen</p>
                            <p>Wichtige Anmerkung: Der Admin muss ihren Account freischalten!</p>
                        </div>
        const errorP = <p>{resultInfo}</p>
        const classString = "ui icon message";
        const classWarningString = "ui icon error message";
        
        return (
        <div style={{ backgroundImage: 'url(../../../img/bg.png)' }}>
            <div class="page-login">
                <div class="ui centered grid container">
                    <div class="nine wide column">
                        <div class={resultInfo === "" ? classString : classWarningString}>
                            <i class="lock icon"></i>
                            <div class="content">
                                <div class="header">
                                    Sign Up!
                                </div>
                                { resultInfo === "" ? normalP : errorP }
                            </div>
                        </div>
                        <div class="ui fluid card">
                            <div class="content">
                                <form class="ui form" action="" method="post" onSubmit={this.handleSubmit} autoComplete="off">
                                    <div class="field">
                                        <label>Name or E-Mail</label>
                                        <input type="text" name="NameOrEmail" placeholder="Admin"></input>
                                    </div>
                                    <div class="field">
                                        <label>Password</label>
                                        <input type="password" name="Password" placeholder="Password"></input>
                                    </div>
                                    <div class="field">
                                        <label>Confirm Password</label>
                                        <input type="password" name="PasswordConfirm" placeholder="Confirm Password"></input>
                                    </div>
                                    
                                    <br></br>
                                    <br></br>
                                    <div class="ui buttons">
                                        <button class="ui primary labeled icon button" type="submit">
                                            <i class="unlock alternate icon"></i>
                                            Sign Up!
                                        </button>
                                        <div class="or"></div>
                                        <button class="ui positive button" onClick={this.btnClick.bind(this)}>
                                            <i class="sign-in alternate icon"></i>
                                            <Link to="/login">Account already set? Login! </Link>
                                        </button>
                                    </div>
                                    
                                </form>
                                <div>{this.state.resultInfo}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br>
        </div>
        );
      }
    }