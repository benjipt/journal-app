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
      showEditForm: false,
      showJournalPage: false,
      journals: [],
      selectedJournal: {}
    }

    this.getJournals = this.getJournals.bind(this)
    this.toggleCreateForm = this.toggleCreateForm.bind(this)
    this.handleAddJournal = this.handleAddJournal.bind(this)
    this.toggleshowJournalPage = this.toggleshowJournalPage.bind(this)
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

  toggleshowJournalPage(event) {
    const thisJournal = this.state.journals.find(journal => journal._id === event.currentTarget.id)
    this.setState({ 
      showJournalPage: !this.state.showJournalPage,
      selectedJournal: thisJournal
    })
  }

  handleClickHome() {
    this.setState({
      showCreateForm: false,
      showJournalPage: false,
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
            showJournalPage: false,
            journals: copyJournals
          })
        }
      })
  }

  render() {
    return (
      <div className="container text-center mt-4">

        <HomeButton handleClickHome={ this.handleClickHome } />
        
        { !this.state.showCreateForm && !this.state.showJournalPage && !this.state.showEditForm && 
          <CreateButton toggleCreateForm={ this.toggleCreateForm } /> }

        { this.state.showCreateForm &&
          <CreateForm 
            toggleCreateForm={ this.toggleCreateForm }
            handleAddJournal={ this.handleAddJournal } /> }

        { !this.state.showJournalPage && !this.state.showCreateForm && !this.state.showEditForm && this.state.journals && 
          <Journals 
            journals={ this.state.journals }
            toggleshowJournalPage={ this.toggleshowJournalPage } /> }

        { this.state.showJournalPagePage &&
          <JournalPage 
            selectedJournal={ this.state.selectedJournal }
            handleDeleteJournal={ this.handleDeleteJournal } /> }
      </div>
    )
  }
}

