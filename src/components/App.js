import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import Dashboard from './Dashboard'
import LeaderBoard from './LeaderBoard'
import AddQuestion from './AddQuestion'
import Poll from './Poll'
import Login from './Login'
import PageNotFound from './PageNotFound'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <NavBar />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/add" exact component={AddQuestion} />
            <Route path="/leaderboard" exact component={LeaderBoard} />
            <Route path="/questions/:id" component={Poll} />
            <Route path="/login" exact component={Login} />
            <Route component={PageNotFound}/>
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    isAuthenticated: authedUser !== null
  };
}

export default connect(mapStateToProps)(App);