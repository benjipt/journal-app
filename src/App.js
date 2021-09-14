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

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ userGoogleId, setUserGoogleId ] = useState('')
  const [ showCreateForm, setShowCreateForm ] = useState(false)
  const [ showEditForm, setShowEditForm ] = useState(false)
  const [ showJournalPage, setShowJournalPage ] = useState(false)
  const [ journals, setJournals ] = useState([])
  const [ selectedJournal, setSelectedJournal ] = useState({})

  const handleLogin = profile => {
    setIsLoggedIn(true)
    setUserGoogleId(profile.googleId)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserGoogleId('')
  }

  const getJournals = userID => {
    fetch(baseURL + '/journals/' + userID)
    .then(data => { return data.json()}, err => console.log(err))
    .then(parsedData => setJournals(parsedData), err => console.log(err))
  }

  const handleOnSelect = item => {
    const thisJournal = journals.find(journal => journal._id === item._id)
    setShowJournalPage(!showJournalPage)
    setSelectedJournal(thisJournal)
  }

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm)
  }

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm)
    setShowJournalPage(false)
  }

  const handleAddJournal = journal => {
    const copyJournals = [...journals]
    copyJournals.unshift(journal)
    setJournals(copyJournals)
  }

  const toggleShowJournalPage = e => {
    const thisJournal = journals.find(journal => journal._id === e.currentTarget.id)
    setShowJournalPage(!showJournalPage)
    setSelectedJournal(thisJournal)
  }

  const handleClickHome = () => {
    setShowCreateForm(false)
    setShowJournalPage(false)
    setShowEditForm(false)
  }

  const handleDeleteJournal = e => {
    fetch(`${baseURL}/journals/${e.target.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if(res.status === 200) {
          const findIndex = journals.findIndex(journal => journal._id === e.target.id)
          const copyJournals = [...journals]
          copyJournals.splice(findIndex, 1)
          setShowJournalPage(false)
          setJournals(copyJournals)
        }
      })
  }

  return (
    <div className="container text-center mt-4">

      <HomeButton handleClickHome={ handleClickHome } />

      { !isLoggedIn &&
        <Login handleLogin={ handleLogin } /> }

      { isLoggedIn &&
        <Logout handleLogout={ handleLogout } /> }
      
      { isLoggedIn && !showCreateForm && !showJournalPage && !showEditForm && 
        <CreateButton toggleCreateForm={ toggleCreateForm } /> }

      { isLoggedIn && !showCreateForm && !showJournalPage && !showEditForm && 
        <SearchBar 
          items={ journals }
          onSelect={ handleOnSelect } /> }

      { showCreateForm &&
        <CreateForm 
          toggleCreateForm={ toggleCreateForm }
          handleAddJournal={ handleAddJournal }
          userID={ userGoogleId } /> }

      { showEditForm &&
        <EditForm 
          selectedJournal={ selectedJournal }
          handleClickHome={ handleClickHome }
          userID={ userGoogleId } /> }

      { isLoggedIn && !showJournalPage && !showCreateForm && !showEditForm && journals && 
        <Journals 
          getJournals={ getJournals }
          journals={ journals }
          toggleShowJournalPage={ toggleShowJournalPage }
          userID={ userGoogleId } /> }

      { showJournalPage && 
        <JournalPage 
          selectedJournal={ selectedJournal }
          handleDeleteJournal={ handleDeleteJournal }
          toggleEditForm={ toggleEditForm } /> }
    </div>
  )
}

