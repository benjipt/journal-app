import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.onSuccess = this.onSuccess.bind(this)
        this.onFailure = this.onFailure.bind(this)
    }

    onSuccess(res) {
        // console.log('[Login Success] currentUser:', res.profileObj)
        this.props.handleLogin(res.profileObj)
    }

    onFailure(res) {
        console.log('[Login failed] res:', res)
    }

    render() {
        return (
            <div className="mt-4 mb-2">
                <GoogleLogin 
                    clientId={process.env.CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div>
        )
    }
}
