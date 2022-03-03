import React from 'react';


import Login_Form from "../components/Login_Form"


class Login extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        
        return (
            <div>
                <Login_Form /> 
            </div>
        );
    }
}

export default Login;

/**
 * <Segment style={{display: "table", margin: "0 auto"}} compact >
            
                    <form action="" method="post" onSubmit={this.handleSubmit} autoComplete="off">
                        <Input label="Name or E-Mail" name="loginNameOrEmail" />
                        <br />
                        <Input label="Password" type="password" name="loginPassword" />
                        <br />
                        <Checkbox checked={true} /> Remember Me
                        <br />
                        <Button variant="contained" type="submit">Login</Button>
                        <br />
                        <Link href="/signup" >
                            Or register a new account here
                        </Link>
                    </form>
                    <div>{this.state.resultInfo}</div>

                </Segment>
 */