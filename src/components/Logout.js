import React, { Component } from 'react'
import { GoogleLogout } from 'react-google-login'

const clientId = process.env.CLIENTID

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
