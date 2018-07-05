import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './App.scss'
import Creator from './pages/Creator/Creator'

class App extends Component {
  render() {
    return (
      <Router basename="">
        <div className="container">
          <Switch>
            <Route component={Creator} exact path="/creator" />
            <Redirect to="/creator" />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
