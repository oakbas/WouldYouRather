import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import Dashboard from './Dashboard'
import LeaderBoard from './LeaderBoard'
import AddQuestion from './AddQuestion'
import QuestionsAnswers from './QuestionsAnswers'
import Login from './Login'
//Todo
//import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div className='container'>
            <Nav />
            <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/questionsanswers/:questionId' component={QuestionsAnswers} />
                  <Route path='/leaderboard' component={LeaderBoard} />
                  <Route path='/new' component={AddQuestion} />
                  <Route path='/login' component={Login} />
                </div>
          </div>
        </Fragment>
      </Router>
    )};
}

//function mapStateToProps ({ authedUser, users }) {
  //return {
    //loading: authedUser === null
  //}
//}

export default connect()(App)
//export default connect(mapStateToProps)(App)