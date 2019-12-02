import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class NavBar extends Component {

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
  };

  render() {
    const { authedUser } = this.props;

    return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
         <NavLink to='/add' activeClassName='active'>
           Add Question
         </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        {this.props.authedUser !== null &&
        <li>
          Hello {authedUser}
        </li> }
        {this.props.authedUser !== null &&
        <li>
          <NavLink to='/login' activeClassName='active'>
            <button variant="primary" onClick={this.handleLogout}>
              Logout
            </button>
          </NavLink>
        </li>
        }
     </ul>
    </nav>
    )
  }
}

function mapStateToProps({ authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NavBar)