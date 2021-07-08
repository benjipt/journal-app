import React, { Component } from 'react'

import CreateButton from './components/CreateButton'
import CreateForm from './components/CreateForm'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showCreateForm: false,
      journals: []
    }

    this.toggleCreateForm = this.toggleCreateForm.bind(this)
    this.handleAddJournal = this.handleAddJournal.bind(this)
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
      </div>
    )
  }
}

