import React, { Component } from 'react'

export default class Journals extends Component {
    render() {
        return (
            <div className="row align-items-center">
                { this.props.journals.map(journal => {
                    return (
                    <div className="col-3 card">
                        <div className="card-body">
                            <h5 className="card-title mb-2">{ journal.title }</h5>
                            <p className="card-text">{ journal.body }</p>
                        </div>
                    </div>
                    )
                }) }
            </div>
        )
    }
}
