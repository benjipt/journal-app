import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login'

const clientId = process.env.CLIENTID

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.onSuccess = this.onSuccess.bind(this)
        this.onFailure = this.onFailure.bind(this)
    }

    onSuccess(res) {
        console.log('[Login Success] currentUser:', res.profileObj)
        this.props.handleLogin()
    }

    onFailure(res) {
        console.log('[Login failed] res:', res)
    }

    render() {
        return (
            <div className="mt-4 mb-2">
                <GoogleLogin 
                    clientId={clientId}
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
