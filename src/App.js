import React, { Component } from 'react'

import CreateButton from './components/CreateButton';
import CreateForm from './components/CreateForm';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showCreateForm: false
    }

    this.toggleShowButton = this.toggleShowButton.bind(this)
  }

  toggleShowButton() {
    this.setState({ showCreateForm: !this.state.showCreateForm })
  }

  render() {
    return (
      <div className="container text-center mt-4">
        <h1 className="display-1">Journals</h1>
        { !this.state.showCreateForm && <CreateButton toggleShowButton={ this.toggleShowButton } /> }
        { this.state.showCreateForm && <CreateForm /> }
      </div>
    )
  }
}

