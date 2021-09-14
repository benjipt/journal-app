import React, { useState } from 'react'

import Login from './components/Login'
import Logout from './components/Logout'
import HomeButton from './components/HomeButton'
import SearchBar from './components/SearchBar'
import CreateButton from './components/CreateButton'
import CreateForm from './components/CreateForm'
import EditForm from './components/EditForm'
import Journals from './components/Journals'
import JournalPage from './components/JournalPage'

let baseURL = 'https://journals-app-api.herokuapp.com'

export default function App() {

  const [ state, setState ] = useState({
    isLoggedIn: false,
    userGoogleId: '',
    showCreateForm: false,
    showEditForm: false,
    showJournalPage: false,
    journals: [],
    selectedJournal: {}
  })

  const handleLogin = (profile) => {
    setState({
      ...state,
      isLoggedIn: true,
      userGoogleId: profile.googleId
    })
  }

  const handleLogout = () => {
    setState({
      ...state,
      isLoggedIn: false,
      userGoogleId: ''
    })
  }

  const getJournals = userID => {
    fetch(baseURL + '/journals/' + userID)
    .then(data => { return data.json()}, err => console.log(err))
    .then(parsedData => setState({...state, journals: parsedData}), err => console.log(err))
  }

  const handleOnSelect = item => {
    const thisJournal = state.journals.find(journal => journal._id === item._id)
    setState({ 
      ...state,
      showJournalPage: !state.showJournalPage,
      selectedJournal: thisJournal
    })
  }

  const toggleCreateForm = () => {
    setState({ showCreateForm: !state.showCreateForm })
  }

  const toggleEditForm = () => {
    setState({ 
      ...state,
      showEditForm: !state.showEditForm,
      showJournalPage: false
    })
  }

  const handleAddJournal = journal => {
    const copyJournals = [...state.journals]
    copyJournals.unshift(journal)
    setState({
      ...state,
      journals: copyJournals
    })
  }

  const toggleShowJournalPage = e => {
    const thisJournal = state.journals.find(journal => journal._id === e.currentTarget.id)
    setState({ 
      ...state,
      showJournalPage: !state.showJournalPage,
      selectedJournal: thisJournal
    })
  }

  const handleClickHome = () => {
    setState({
      ...state,
      showCreateForm: false,
      showJournalPage: false,
      showEditForm: false
    })
  }

  const handleDeleteJournal = e => {
    fetch(`${baseURL}/journals/${e.target.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if(res.status === 200) {
          const findIndex = state.journals.findIndex(journal => journal._id === e.target.id)
          const copyJournals = [...state.journals]
          copyJournals.splice(findIndex, 1)
          setState({
            ...state,
            showJournalPage: false,
            journals: copyJournals
          })
        }
      })
  }

  return (
    <div className="container text-center mt-4">

      <HomeButton handleClickHome={ handleClickHome } />

      { !state.isLoggedIn &&
        <Login handleLogin={ handleLogin } /> }

      { state.isLoggedIn &&
        <Logout handleLogout={ handleLogout } /> }
      
      { state.isLoggedIn && !state.showCreateForm && !state.showJournalPage && !state.showEditForm && 
        <CreateButton toggleCreateForm={ toggleCreateForm } /> }

      { state.isLoggedIn && !state.showCreateForm && !state.showJournalPage && !state.showEditForm && 
        <SearchBar 
          items={ state.journals }
          onSelect={ handleOnSelect } /> }

      { state.showCreateForm &&
        <CreateForm 
          toggleCreateForm={ toggleCreateForm }
          handleAddJournal={ handleAddJournal }
          userID={ state.userGoogleId } /> }

      { state.showEditForm &&
        <EditForm 
          selectedJournal={ state.selectedJournal }
          handleClickHome={ handleClickHome }
          userID={ state.userGoogleId } /> }

      { state.isLoggedIn && !state.showJournalPage && !state.showCreateForm && !state.showEditForm && state.journals && 
        <Journals 
          getJournals={ getJournals }
          journals={ state.journals }
          toggleShowJournalPage={ toggleShowJournalPage }
          userID={ state.userGoogleId } /> }

      { state.showJournalPage && 
        <JournalPage 
          selectedJournal={ state.selectedJournal }
          handleDeleteJournal={ handleDeleteJournal }
          toggleEditForm={ toggleEditForm } /> }
    </div>
  )
}

