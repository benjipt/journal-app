import React, { Component } from 'react'

import Login from './components/Login'
import Logout from './components/Logout'
import HomeButton from './components/HomeButton'
import SearchBar from './components/SearchBar'
import CreateButton from './components/CreateButton'
import CreateForm from './components/CreateForm'
import EditForm from './components/EditForm'
import Journals from './components/Journals'
import JournalPage from './components/JournalPage'

let baseURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://journals-app-api.herokuapp.com';
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      userGoogleId: '',
      showCreateForm: false,
      showEditForm: false,
      showJournalPage: false,
      journals: [],
      selectedJournal: {}
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.getJournals = this.getJournals.bind(this)
    this.handleOnSelect = this.handleOnSelect.bind(this)
    this.toggleCreateForm = this.toggleCreateForm.bind(this)
    this.toggleEditForm = this.toggleEditForm.bind(this)
    this.handleAddJournal = this.handleAddJournal.bind(this)
    this.toggleshowJournalPage = this.toggleshowJournalPage.bind(this)
    this.handleClickHome = this.handleClickHome.bind(this)
    this.handleDeleteJournal = this.handleDeleteJournal.bind(this)
  }

  handleLogin(profile) {
    this.setState({
      isLoggedIn: true,
      userGoogleId: profile.googleId
    })
  }

  handleLogout() {
    this.setState({
      isLoggedIn: false,
      userGoogleId: ''
    })
  }

  getJournals() {
    fetch(baseURL + '/journals')
    .then(data => { return data.json()}, err => console.log(err))
    .then(parsedData => this.setState({journals: parsedData}), err => console.log(err))
  }

  handleOnSelect(item) {
    const thisJournal = this.state.journals.find(journal => journal._id === item._id)
    this.setState({ 
      showJournalPage: !this.state.showJournalPage,
      selectedJournal: thisJournal
    })
  }

  toggleCreateForm() {
    this.setState({ showCreateForm: !this.state.showCreateForm })
  }

  toggleEditForm() {
    this.setState({ 
      showEditForm: !this.state.showEditForm,
      showJournalPage: false
    })
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
      showEditForm: false
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

        { !this.state.isLoggedIn &&
          <Login handleLogin={ this.handleLogin } /> }

        { this.state.isLoggedIn &&
          <Logout handleLogout={ this.handleLogout } /> }
        
        { this.state.isLoggedIn && !this.state.showCreateForm && !this.state.showJournalPage && !this.state.showEditForm && 
          <CreateButton toggleCreateForm={ this.toggleCreateForm } /> }

        { this.state.isLoggedIn && !this.state.showCreateForm && !this.state.showJournalPage && !this.state.showEditForm && 
          <SearchBar 
            items={ this.state.journals }
            onSelect={ this.handleOnSelect } /> }

        { this.state.showCreateForm &&
          <CreateForm 
            toggleCreateForm={ this.toggleCreateForm }
            handleAddJournal={ this.handleAddJournal } /> }

        { this.state.showEditForm &&
          <EditForm 
            selectedJournal={ this.state.selectedJournal }
            handleClickHome={ this.handleClickHome } /> }

        { this.state.isLoggedIn && !this.state.showJournalPage && !this.state.showCreateForm && !this.state.showEditForm && this.state.journals && 
          <Journals 
            getJournals={ this.getJournals }
            journals={ this.state.journals }
            toggleshowJournalPage={ this.toggleshowJournalPage } /> }

        { this.state.showJournalPage && 
          <JournalPage 
            selectedJournal={ this.state.selectedJournal }
            handleDeleteJournal={ this.handleDeleteJournal }
            toggleEditForm={ this.toggleEditForm } /> }
      </div>
    )
  }
}

