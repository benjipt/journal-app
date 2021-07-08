import React, { Component } from 'react'

import CreateButton from './components/CreateButton'
import CreateForm from './components/CreateForm'
import Journals from './components/Journals'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
    // UPDATE THIS LATER
  baseURL = 'https://xxxxxxxxxxx.herokuapp.com';
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showCreateForm: false,
      journals: []
    }

    this.getJournals = this.getJournals.bind(this)
    this.toggleCreateForm = this.toggleCreateForm.bind(this)
    this.handleAddJournal = this.handleAddJournal.bind(this)
  }

  componentDidMount() {
    this.getJournals()
  }

  getJournals() {
    fetch(baseURL + '/journals')
    .then(data => { return data.json()}, err => console.log(err))
    .then(parsedData => this.setState({journals: parsedData}), err => console.log(err))
  }

  toggleCreateForm() {
    this.setState({ showCreateForm: !this.state.showCreateForm })
  }

  handleAddJournal(journal) {
    const copyJournals = [...this.state.journals]
    copyJournals.unshift(journal)
    this.setState({
      journals: copyJournals
    })
  }

  render() {
    return (
      <div className="container text-center mt-4">
        <h1 className="display-1">Journals</h1>
        
        { !this.state.showCreateForm && 
          <CreateButton toggleCreateForm={ this.toggleCreateForm } /> }

        { this.state.showCreateForm && 
          <CreateForm 
            toggleCreateForm={ this.toggleCreateForm }
            handleAddJournal={ this.handleAddJournal } /> }

        { !this.state.showCreateForm && this.state.journals &&
          <Journals journals={ this.state.journals } /> }
      </div>
    )
  }
}

