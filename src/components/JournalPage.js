import React, { Component } from 'react'


export default class JournalPage extends Component {
    render() {
        return (
            <div className="mt-5">
                <h3>{ this.props.selectedJournal.title }</h3>
            </div>
        )
    }
}
