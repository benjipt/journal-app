import React, { Component } from 'react'

import HomeButton from './components/HomeButton'
import CreateButton from './components/CreateButton'
import CreateForm from './components/CreateForm'
import Journals from './components/Journals'
import JournalPage from './components/JournalPage'

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
      showJournal: false,
      journals: [],
      selectedJournal: {}
    }

    this.getJournals = this.getJournals.bind(this)
    this.toggleCreateForm = this.toggleCreateForm.bind(this)
    this.handleAddJournal = this.handleAddJournal.bind(this)
    this.toggleShowJournal = this.toggleShowJournal.bind(this)
    this.handleClickHome = this.handleClickHome.bind(this)
    this.handleDeleteJournal = this.handleDeleteJournal.bind(this)
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

  toggleShowJournal(event) {
    const thisJournal = this.state.journals.find(journal => journal._id === event.currentTarget.id)
    this.setState({ 
      showJournal: !this.state.showJournal,
      selectedJournal: thisJournal
    })
  }

  handleClickHome() {
    this.setState({
      showCreateForm: false,
      showJournal: false,
    })
  }

  handleDeleteJournal(event) {
    fetch(`${baseURL}/journals/${event.target.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if(res.status === 200) {
          const findIndex = this.state.journals.findIndex(journal => journal._id === event.target.id)
          const copyJournals = [...this.state.journals]
          copyJournals.splice(findIndex, 1)
          this.setState({
            showJournal: false,
            journals: copyJournals
          })
        }
      })
  }

  render() {
    return (
      <div className="container text-center mt-4">

        <HomeButton handleClickHome={ this.handleClickHome } />
        
        { !this.state.showCreateForm && !this.state.showJournal &&
          <CreateButton toggleCreateForm={ this.toggleCreateForm } /> }

        { this.state.showCreateForm && 
          <CreateForm 
            toggleCreateForm={ this.toggleCreateForm }
            handleAddJournal={ this.handleAddJournal } /> }

        { !this.state.showJournal && !this.state.showCreateForm && this.state.journals && 
          <Journals 
            journals={ this.state.journals }
            toggleShowJournal={ this.toggleShowJournal } /> }

        { this.state.showJournal &&
          <JournalPage 
            selectedJournal={ this.state.selectedJournal }
            handleDeleteJournal={ this.handleDeleteJournal } /> }
      </div>
    )
  }
}

