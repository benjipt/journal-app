import React, { Component } from 'react'
import AddButton from './components/AddButton'

export default class App extends Component {
  render() {
    return (
      <div className="container text-center mt-4">
        <h1 className="display-1">Journals</h1>
        <AddButton />
      </div>
    )
  }
}

