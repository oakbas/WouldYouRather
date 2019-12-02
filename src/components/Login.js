import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import RegisteredUserList from './RegisteredUserList'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Dashboard from './Dashboard'

class Login extends Component {
  state = {
    selectedUserId: null
  };

  handleUserSelect = userId => {
    this.setState({
      selectedUserId: userId
    });
  };

  handleLogin = () => {
    const { dispatch } = this.props;
    const { selectedUserId } = this.state;
    if (selectedUserId !== null) {
      dispatch(setAuthedUser(selectedUserId));
    }
  };

  render() {
    const { isAuthenticated } = this.props;

    //login control
    if (isAuthenticated) {
      return (
        <div className="container">
          <Dashboard />
        </div>
      );
    }
    return (
    <div className="justify-content-md-center">
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Welcome To Would You Rather Application</Card.Title>
                <Card.Text>
                    Please log in with selecting one of the users
                </Card.Text>
                <RegisteredUserList
                    handleUserSelect={this.handleUserSelect}
                    selectedUser={this.state.selectedUserId}
                />
                <br>
                </br>
                <Button variant="primary" onClick={this.handleLogin}>Login</Button>
            </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    isAuthenticated: authedUser !== null,
    users
  };
}

export default connect(mapStateToProps)(Login)

//export default connect()(Login);