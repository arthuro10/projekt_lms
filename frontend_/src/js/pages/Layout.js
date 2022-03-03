import React from "react"
import { HashRouter, Route } from 'react-router-dom';
import { observer } from "mobx-react";

import NavigationBar from "../components/NavigationBar"

import Logs from "../pages/Logs"
import Personal from "../pages/Personal"

import Login from "../routes/Login"
import Signup from "../routes/Signup"
import Logout from "../routes/Logout"

// durch die Annotation @observer 
@observer
export default class Layout extends React.Component {
    render() {
        const containerStyle = { 
            marginTop: "5px"
        };

        return (
            <HashRouter>
                <div>
                     {}
                    <NavigationBar location={location}/>
                    <div class="container" style={containerStyle}>
                        <div class="row">
                            <div class="col-xs-12">
                                <Route exact path="/" component={Login}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/logout" component={Logout}/>
                                <Route exact path="/signup" component={Signup}/>
                                <Route exact path="/logs" component={Logs}/>
                                <Route exact path="/personal" component={Personal}/>
                                {console.log("Wie oft wird das hier aufgerufen?")}
                            </div>
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}