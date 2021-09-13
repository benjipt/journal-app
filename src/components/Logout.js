import React, { Component } from 'react'
import { GoogleLogout } from 'react-google-login'

require('dotenv').config()
// Need to troubleshoot why process.env.REACT_APP_CLIENTID is undefined
const clientId = process.env.REACT_APP_CLIENTID || '890910246306-5u2nbfcpob0o0jk6j5tr53aanpro9pau.apps.googleusercontent.com'

export default class Logout extends Component {
    constructor(props) {
        super(props)

        this.onSuccess = this.onSuccess.bind(this)
    }

    onSuccess() {
        this.props.handleLogout()
    }

    render() {
        return (
            <div className="mt-4 mb-2">
                <GoogleLogout 
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={this.onSuccess}
                />
            </div>
        )
    }
}
