import React, { Component } from 'react'

export default class Journals extends Component {
    render() {
        return (
            <div className="container px-4">
                { this.props.journals.map(journal => {
                    return (
                        <div className="row justify-content-center mb-2" key={ journal._id }>
                            <div className="col-9 card btn btn-custom">
                                <div className="card-body">
                                    <h5 className="card-title mb-2">{ journal.title }</h5>
                                    <p className="card-text">{ journal.body }</p>
                                </div>
                            </div>
                        </div>
                    )
                }) }
            </div>
        )
    }
}
