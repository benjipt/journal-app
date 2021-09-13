import React from 'react'
import { GoogleLogin } from 'react-google-login'

require('dotenv').config()
// Need to troubleshoot why process.env.REACT_APP_CLIENTID is undefined
const clientId = process.env.REACT_APP_CLIENTID || '890910246306-5u2nbfcpob0o0jk6j5tr53aanpro9pau.apps.googleusercontent.com'

export default function Login(props) {

    const { handleLogin } = props

    const onSuccess = res => {
        handleLogin(res.profileObj)
    }

    const onFailure = res => {
        console.log('[Login failed] res:', res)
    }

    return (
        <div className="mt-4 mb-2">
            <GoogleLogin 
                clientId={ clientId }
                buttonText="Login with Google"
                onSuccess={ onSuccess }
                onFailure={ onFailure }
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}
