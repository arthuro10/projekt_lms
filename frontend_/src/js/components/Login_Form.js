import React from "react";

import { Link } from "react-router-dom";

export default class Login_Form extends React.Component {
    constructor(props) {
        super(props);
        this.baseURL = 'http://localhost:3000/';

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            resultInfo: "",
        };

    }

    componentDidMount() {
        console.log("Das LocalStorage Objekt!: " + localStorage.loginId);
        if(localStorage.loginId) {
            window.location.href = '/#/logs';
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const currentForm = event.target;
        const tmpFormData = new FormData(currentForm);
        const data = {
            loginNameOrEmail: tmpFormData.get('loginNameOrEmail'),
            loginPassword: tmpFormData.get('loginPassword')
        };

        if(!data.loginNameOrEmail) {
            this.setState({resultInfo: 'Name / E-Mail darf nicht leer sein'});
        } else if(!data.loginPassword) {
            this.setState({resultInfo: 'Passwort darf nicht leer sein'});
        } else {
            console.log("Es wird gepostet");
            fetch(this.baseURL+'api/login/login/', {
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
                        currentForm.reset();
                        localStorage.loginId = result.loginId;
                        localStorage.avatarFileType = result.avatarFileType;
                        window.location.reload();
                    }
                },
                (error) => {
                    console.log("Error: " + JSON.stringify(error));
                    this.setState({resultInfo: 'Name / E-Mail oder Passwort stimmen nicht!'});
                }
            );
        }
    }

    btnClick () {
        window.location.href = '/#/signup';
    }

    render() {
        const {resultInfo} = this.state;
        const normalP = <p>Wenn Sie einen Account haben, können Sie sich hier anmelden</p>
        const errorP = <p>{resultInfo}</p>
        const classString = "ui icon message";
        const classErrorString = "ui icon error message";
        const classPositiveString = "ui icon positive message";
        
        
        return (
        <div style={{ backgroundImage: 'url(../../../img/bg.png)' }}>
            <div class="page-login">
                <div class="ui centered grid container">
                    <div class="nine wide column">
                        <div class={resultInfo !== "Erfolg" ? (resultInfo === "" ? classString : classErrorString) : classPositiveString}>
                            <i class="lock icon"></i>
                            <div class="content">
                                <div class="header">
                                    Login!
                                </div>
                                { resultInfo === "" ? normalP : errorP }
                            </div>
                        </div>
                        <div class="ui fluid card">
                            <div class="content">
                                <form class="ui form" action="" method="post" onSubmit={this.handleSubmit} autoComplete="off">
                                    <div class="field">
                                        <label>Name or E-Mail</label>
                                        <input type="text" name="loginNameOrEmail" placeholder="Admin"></input>
                                    </div>
                                    <div class="field">
                                        <label>Password</label>
                                        <input type="password" name="loginPassword" placeholder="Password"></input>
                                    </div>
                                    
                                    <br></br>
                                    <br></br>
                                    <div class="ui buttons">
                                        <button class="ui primary labeled icon button" type="submit">
                                            <i class="unlock alternate icon"></i>
                                            Login!
                                        </button>
                                        <div class="or"></div>
                                        <button class="ui positive button" onClick={this.btnClick.bind(this)} >
                                            <i class="sign-in alternate icon"></i>
                                            <Link to="/signup">Sign Up!</Link>
                                        </button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br>
        </div>
        );
      }
    }
