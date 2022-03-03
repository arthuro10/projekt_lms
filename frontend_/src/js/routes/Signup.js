import React from 'react';

import Signup_Form from "../components/Register_Form"

class Signup extends React.Component {
    constructor(props) {
        super(props);

    }

   
    

    render() {

        return (
            <div>
                <Signup_Form /> 
            </div>
        );
    }
}

export default Signup;