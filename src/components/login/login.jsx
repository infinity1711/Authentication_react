import React from 'react';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userEmail: '',
            userPassword: '',
            emailError: null,
            passwordError: null,
            emailErrorMessage: '',
            pwdErrorMessage: ''
        }
    }

    handleChange = (event) => {
        let { name, value } = event.target
        // console.log(name, value)
        if (name === 'userEmail') {
            let regEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            let emailValid = value.match(regEx)
            console.log('email valid  : ' + emailValid)
            if (emailValid === null) {
                this.setState({ emailError: true, emailErrorMessage: 'Enter valid email' })
                return;
            }
            else {
                this.setState({ emailError: false })
            }
        }
        if (name === 'userPassword') {
            let regex = '(?=.*[A-Z])'
            let pwdValid = value.match(regex)
            console.log('pwd valid  : ' + pwdValid)
            if (pwdValid === null) {
                this.setState({ passwordError: true, pwdErrorMessage: 'Password must contain one uppercase letter' })
                return;
            }
            else {
                this.setState({ passwordError: false })
            }

        }
        this.setState({ [name]: value })
    }

    submitLogin = () => {
        console.log(this.state.userEmail, this.state.userPassword)
        if (!this.state.userEmail) {
            this.setState({ emailError: true, emailErrorMessage: 'Email is required' })
            return;
        }
        if (!this.state.userPassword) {
            this.setState({ passwordError: true, pwdErrorMessage: 'Password is required' })
            return;
        }

        console.log(this.state.userEmail.toLocaleLowerCase())
        if (
            this.state.userEmail.toLocaleLowerCase() === 'clarion@clarion.com'
            && this.state.userPassword === 'Clarion123'
        ) {
            console.log('Redirect to Dashboard')
            console.log(this.props)
            this.props.setUserData({ email: this.state.userEmail })
            this.props.history.push('/dashboard')
        }
    }


    render() {
        return (
            <>
                <div style={{ marginTop: '10%', marginLeft: '30%' }}>

                    <div className="card" style={{ width: '400px' }}>
                        <div className="card-body">
                            <h4 style={{ marginBottom: '40px', textAlign: 'center' }}>Login</h4>
                            <input
                                type="text"
                                name="userEmail"
                                placeholder="Enter email id"
                                className="form-control"
                                onChange={this.handleChange}
                            />
                            {this.state.emailError ? <p style={{ margin: '10px 0px 0px 0' }}>{this.state.emailErrorMessage}</p> : null}
                            <br />
                            <input
                                type="password"
                                name="userPassword"
                                placeholder="Enter password"
                                className="form-control"
                                onChange={this.handleChange}
                            />
                            {this.state.passwordError ? <p style={{ margin: '10px 0px 0px 0' }}>{this.state.pwdErrorMessage}</p> : null}
                            <br />
                            <button
                                onClick={this.submitLogin}
                                disabled={this.state.emailError || this.state.passwordError}
                                className="btn btn-primary btn-block"
                            >
                                Login
                    </button>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}


export default withRouter(Login)