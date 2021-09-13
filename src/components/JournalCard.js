import React from 'react'

export default function JournalCard(props) {

    const { journal, toggleShowJournalPage } = props

    return (
        <div className="row justify-content-center mb-2">
            <div 
                className="col-9 card btn btn-custom" 
                id={ journal._id }
                onClick={ toggleShowJournalPage }>
                <div className="card-body">
                    <h5 className="card-title mb-2">{ journal.title }</h5>
                    <p className="card-text">{ journal.body }</p>
                </div>
            </div>
        </div>
    )
}
