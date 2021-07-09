import React, { Component } from 'react'

export default class JournalCard extends Component {
    render() {
        return (
            <div className="row justify-content-center mb-2">
                <div 
                    className="col-9 card btn btn-custom" 
                    id={ this.props.journal._id }
                    onClick={ this.props.toggleShowJournalPage }>
                    <div className="card-body">
                        <h5 className="card-title mb-2">{ this.props.journal.title }</h5>
                        <p className="card-text">{ this.props.journal.body }</p>
                    </div>
                </div>
            </div>
        )
    }
}
