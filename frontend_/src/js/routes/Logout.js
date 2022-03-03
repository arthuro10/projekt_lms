import React from 'react';
import { Header } from 'semantic-ui-react'

class Logout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resultInfo: "",
        };
        this.baseURL = 'http://localhost:3000/';
    }

    componentDidMount() {
        if(!localStorage.loginId) {
            window.location.href = '/#/login';
        } else {
            fetch(this.baseURL+'api/logout/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(res => res.json())
            .then(
                result => {
                    this.setState({resultInfo: result.info});
    
                    if(!result.err) {
                        delete(localStorage.loginId);
                        window.location.href = '/#/';
                    }
                },
                (error) => {
                    console.log("Error: " + JSON.stringify(error));
                }
            );
        }
    };

    render() {
        if(this.state.data != null) {
            return <div>Loading...</div>
        } else {
            return <div><Header>Du wirst ausgeloggt...</Header></div>
        }
    }
}

export default Logout;