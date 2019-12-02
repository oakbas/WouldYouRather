import React, { Component } from 'react'
import { Dropdown} from 'react-bootstrap'
import { connect } from 'react-redux'

class RegisteredUserList extends Component {
  render() {
    const { users, selectedUser, handleUserSelect } = this.props;

    // registered user item list
    let dropdownItems = [];
    if (users.length !== undefined) {
      dropdownItems = users.map(user => {
        return (
          <Dropdown.Item key={user} onClick={() => handleUserSelect(user)}>
            {user}
          </Dropdown.Item>
        );
      });
    }

    //<Image src={userDetail.Image.src} roundedCircle />
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedUser === null ? "Who are you" : selectedUser}
          </Dropdown.Toggle>
          <Dropdown.Menu>{dropdownItems}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users)
  };
}
export default connect(mapStateToProps)(RegisteredUserList);