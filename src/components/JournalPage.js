import React from 'react'

export default function JournalPage(props) {

    const { selectedJournal, toggleEditForm, handleDeleteJournal } = props

    return (
        <div className="mt-5 mb-4">
            <h3>{ selectedJournal.title }</h3>
            <div className="mt-4 row justify-content-center">
                <p className="col-6">{ selectedJournal.body }</p>
            </div>
            <button className="btn btn-secondary btn-sm me-2"
                    id={ selectedJournal._id }
                    onClick={ toggleEditForm }>EDIT</button>
            <button className="btn btn-danger btn-sm"
                    id={ selectedJournal._id }
                    onClick={ handleDeleteJournal }>DELETE</button>
        </div>
    )
}
