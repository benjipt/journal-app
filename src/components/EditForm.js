import React, { Component } from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
    baseURL = 'https://journals-app-api.herokuapp.com';
}

export default class EditForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.selectedJournal.title,
            body: this.props.selectedJournal.body,
            userID: '1234'
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleUpdateJournal = this.handleUpdateJournal.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
      }

    handleUpdateJournal(event) {
        event.preventDefault()
        fetch(`${baseURL}/journals/${event.currentTarget.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body,
                userID: this.state.userID
            })
        })
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson)
            this.props.handleClickHome()
        })
    }

    render() {
        return (
            <div className="mt-4">
                <form 
                    onSubmit={ this.handleUpdateJournal }
                    id={ this.props.selectedJournal._id }>
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
