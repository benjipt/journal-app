import React, { Component } from 'react'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://journals-app-api.herokuapp.com/';
}

export default class CreateForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            body: '',
            userID: '1234'
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
      }

    handleSubmit(event) {
        event.preventDefault()
        fetch(baseURL + '/journals', {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body,
                userID: this.state.userID
            }),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(resJson => {
            this.props.handleAddJournal(resJson)
            this.setState({
                title: '',
                body: '',
                userID: '1234'
            })
            this.props.toggleCreateForm()
            })
            .catch(error => console.log({ 'Error': error }))
    }

    render() {
        return (
            <div className="mt-4">
                <div className="mb-3 d-grid gap-2">
                    <button onClick={ this.props.toggleCreateForm } className="btn btn-lg btn-secondary">Back</button>
                </div>
                <form onSubmit={ this.handleSubmit } >
                    <div className="mb-3">
                        <input onChange={ this.handleChange } type="text" className="form-control" id="title" name="title" placeholder="Title goes here..." />
                        <textarea onChange={ this.handleChange } type="text" className="form-control" id="body" name="body" placeholder="Body text goes here..." rows="10"/>
                    </div>
                    <div className="mb-4 d-grid gap-2">
                        <input type="submit" className="btn btn-lg btn-success" />
                    </div>
                </form>
            </div>
        )
    }
}
