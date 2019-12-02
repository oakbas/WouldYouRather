import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Selection from './Selection'
import PollResults from './PollResults'
import PageNotFound from './PageNotFound'
import Login from './Login'

class Poll extends Component {
  render() {
    const { question, author, id, optionOneCount, optionTwoCount, isAnswered, userAnswer, isAuthenticated } = this.props;

    //login control
    if (!isAuthenticated) {
        return (
            <div className="container">
            <Login />
            </div>
        );
    }

    if (question === undefined) {
      return (
        <div>
          <PageNotFound />
        </div>
      );
    }

    return (
      <div className="center" style={{ width: "30%" }}>
        <Container>
        <h5>{author.name + ' asks:'}</h5>
            <Row>
                <Col sm={4}>
                <img
                    src={author.avatarURL}
                    alt={`Avatar of ${author.name}`}
                    style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                />
                </Col>
                <Col sm={8}>
                {isAnswered ? (
                    <PollResults
                    optionOneCount={optionOneCount}
                    optionTwoCount={optionTwoCount}
                    optionOne={question.optionOne.text}
                    optionTwo={question.optionTwo.text}
                    userAnswer={userAnswer}
                    />
                ) : (
                    <Selection
                    optionOne={question.optionOne.text}
                    optionTwo={question.optionTwo.text}
                    onItemSelected={this.onItemSelected}
                    id={id}
                    />
                )}
                </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params;
  const question = questions[id];

  if (question === undefined) {
    return { question };
  }

  const author = users[question.author];
  let optionOneCount, optionTwoCount;
  let isAnswered = false;
  let userAnswer = null;
  
  if(question.optionOne.votes.includes(authedUser)) {
    userAnswer = 'optionOne'
    optionOneCount = question.optionOne.votes.length;
    optionTwoCount = question.optionTwo.votes.length;
    isAnswered = true;
  } 
  else if (question.optionTwo.votes.includes(authedUser)) {
    userAnswer = 'optionTwo'
    optionOneCount = question.optionOne.votes.length;
    optionTwoCount = question.optionTwo.votes.length;
    isAnswered = true;
  }

  return {
    question,
    optionOneCount,
    optionTwoCount,
    author,
    id,
    isAnswered,
    userAnswer,
    isAuthenticated: authedUser !== null
  };
}

export default connect(mapStateToProps)(Poll);