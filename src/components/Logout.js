import React from 'react'
import { GoogleLogout } from 'react-google-login'

require('dotenv').config()
const clientId = process.env.REACT_APP_CLIENTID

export default function Logout(props) {

    const { handleLogout } = props

    const onSuccess = () => {
        handleLogout()
    }

    return (
        <div className="mt-4 mb-2">
            <GoogleLogout 
                clientId={ clientId }
                buttonText="Logout"
                onLogoutSuccess={ onSuccess }
            />
        </div>
    )
}
