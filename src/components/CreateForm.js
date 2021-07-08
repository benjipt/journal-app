import React, { Component } from 'react'

export default class CreateForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            body: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
      }

    render() {
        return (
            <div className="mt-4">
                <form>
                    <div className="mb-3">
                        {/* <label htmlFor="title" className="form-label">Title</label> */}
                        <input onChange={ this.handleChange } type="text" className="form-control" id="title" name="title" placeholder="Title goes here..." />
                        <textarea onChange={ this.handleChange } type="text" className="form-control" id="body" name="body" placeholder="Body text goes here..." rows="6"/>
                        <input type="hidden" id="userID" name="userID" value="1234" />
                    </div>
                    <div className="mb-4 d-grid gap-2">
                        <input type="submit" className="btn btn-lg btn-success" />
                    </div>
                </form>
            </div>
        )
    }
}
