import React, { Component } from 'react'


export default class JournalPage extends Component {
    render() {
        return (
            <div className="mt-5">
                <h3>{ this.props.selectedJournal.title }</h3>
                <div className="mt-4 row justify-content-center">
                    <p className="col-6">{ this.props.selectedJournal.body }</p>
                </div>
                <button className="btn btn-secondary btn-sm me-2"
                        id={ this.props.selectedJournal._id }
                        onClick={ this.props.toggleEditForm }>EDIT</button>
                <button className="btn btn-danger btn-sm"
                        id={ this.props.selectedJournal._id }
                        onClick={ this.props.handleDeleteJournal }>DELETE</button>
            </div>
        )
    }
}
