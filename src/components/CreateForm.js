import React, { useState } from 'react'

let baseURL = 'https://journals-app-api.herokuapp.com';

// if (process.env.NODE_ENV === 'development') {
//   baseURL = 'http://localhost:3003';
// } else {
//   baseURL = 'https://journals-app-api.herokuapp.com';
// }

export default function CreateForm(props) {

    const { userID, handleAddJournal, toggleCreateForm } = props

    const [ state, setState ] = useState({
        title: '',
        body: '',
        userID
    })

    const handleChange = e => {
        setState({
            ...state,
            [e.currentTarget.id]: e.currentTarget.value
        })
      }

    const handleSubmit = e => {
        e.preventDefault()
        fetch(baseURL + '/journals', {
            method: 'POST',
            body: JSON.stringify({
                title: state.title,
                body: state.body,
                userID: state.userID
            }),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(resJson => {
            handleAddJournal(resJson)
            setState({
                ...state,
                title: '',
                body: '',
            })
            toggleCreateForm()
            })
            .catch(error => console.log({ 'Error': error }))
    }

    return (
        <div className="mt-4">
            <div className="mb-3 d-grid gap-2">
                <button onClick={ toggleCreateForm } className="btn btn-lg btn-secondary">Back</button>
            </div>
            <form onSubmit={ handleSubmit } >
                <div className="mb-3">
                    <input onChange={ handleChange } type="text" className="form-control" id="title" name="title" placeholder="Title goes here..." />
                    <textarea onChange={ handleChange } type="text" className="form-control" id="body" name="body" placeholder="Body text goes here..." rows="10"/>
                </div>
                <div className="mb-4 d-grid gap-2">
                    <input type="submit" className="btn btn-lg btn-success" />
                </div>
            </form>
        </div>
    )
}
