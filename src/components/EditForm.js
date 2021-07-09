import React, { Component } from 'react'

export default class EditForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.selectedJournal.title,
            body: this.props.selectedJournal.body,
            userID: '1234'
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
                        <input onChange={ this.handleChange } type="text" className="form-control" id="title" name="title" value={ this.state.title } />
                        <textarea onChange={ this.handleChange } type="text" className="form-control" id="body" name="body" value={ this.state.body } rows="10"/>
                    </div>
                    <div className="mb-4 d-grid gap-2">
                        <input type="submit" className="btn btn-lg btn-success" value="Update Journal" />
                    </div>
                </form>
            </div>
        )
    }
}
