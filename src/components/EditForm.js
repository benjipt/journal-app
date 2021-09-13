import React, { useState } from 'react'

let baseURL = 'https://journals-app-api.herokuapp.com'

export default function EditForm(props) {

    const { selectedJournal, handleClickHome, userID } = props

    const [ state, setState ] = useState({
        title: selectedJournal.title,
        body: selectedJournal.body,
        userID
    })

    const handleChange = e => {
        setState({ 
            ...state,
            [e.currentTarget.id]: e.currentTarget.value
        })
      }

    const handleUpdateJournal = e => {
        e.preventDefault()
        fetch(`${baseURL}/journals/${e.currentTarget.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...state })
        })
        .then(res => handleClickHome())
        .catch(error => console.log({ 'Error updating journal': error }))
    }

    return (
        <div className="mt-4">
            <form 
                onSubmit={ handleUpdateJournal }
                id={ selectedJournal._id }>
                <div className="mb-3">
                    <input onChange={ handleChange } type="text" className="form-control" id="title" name="title" value={ state.title } />
                    <textarea onChange={ handleChange } type="text" className="form-control" id="body" name="body" value={ state.body } rows="10"/>
                </div>
                <div className="mb-4 d-grid gap-2">
                    <input type="submit" className="btn btn-lg btn-success" value="Update Journal" />
                </div>
            </form>
        </div>
    )
}
