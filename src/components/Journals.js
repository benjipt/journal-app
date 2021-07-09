import React, { Component } from 'react'
import JournalCard from './JournalCard'

export default class Journals extends Component {
    render() {
        return (
            <div className="container px-4">
                { this.props.journals.map(journal => {
                    return (
                        <JournalCard
                            key={ journal._id }
                            journal={ journal }
                            toggleShowJournal={ this.props.toggleShowJournal } />
                    )
                }) }
            </div>
        )
    }
}
