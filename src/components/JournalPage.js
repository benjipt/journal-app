import React, { Component } from 'react'


export default class JournalPage extends Component {
    render() {
        return (
            <div className="mt-5">
                <h3>{ this.props.selectedJournal.title }</h3>
                <div className="mt-4 row justify-content-center">
                    <p className="col-6">{ this.props.selectedJournal.body }</p>
                </div>
                <button className="btn btn-secondary me-2">EDIT</button>
                <button className="btn btn-danger">DELETE</button>
            </div>
        )
    }
}
