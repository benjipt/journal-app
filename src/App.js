import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateButton from './components/CreateButton';
import CreateForm from './components/CreateForm';

export default class App extends Component {

  render() {
    return (
      <div className="container text-center mt-4">
        <h1 className="display-1">Journals</h1>
        <Router>
          <Link to="/create">
            <CreateButton />
          </Link>
          <Switch>
            <Route path="/create">
              <CreateForm />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

