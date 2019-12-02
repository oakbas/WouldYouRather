import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col } from 'react-bootstrap'

class LeaderBoardItem extends Component {
  render() {
    const { score, users } = this.props;
    const user = users[score.id];

    return (
      <div className="center" style={{ width: "100%" }}>
        <Card>
          <Card.Body>
            <Row>
              <Col md={4}>
                <img
                  src={user.avatarURL}
                  alt={`Avatar of ${user.name}`}
                  style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                />
              </Col>
              <Col md={8}>
                <h6>{user.name} has {score.total} points</h6>
              </Col>
            </Row>
            <Row>
              <Col>Questions Answered : {score.answerCount}</Col>
            </Row>
            <Row>
              <Col>Questions Asked : {score.questionCount}</Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

export default connect(mapStateToProps)(LeaderBoardItem);