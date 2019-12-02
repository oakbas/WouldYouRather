import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs } from 'react-bootstrap'
import QuestionListItem from './QuestionListItem'
import Login from './Login'

class Dashboard extends Component {
  state = {
    //default selectedTab is unanswered
    selectedTab: "unanswered"
  };

  onSelect = eventKey => {
    this.setState({
      selectedTab: eventKey
    });
  };

  render() {
    const { unAnsweredQuestionIds, answeredQuestionIds, isAuthenticated } = this.props;
    const { selectedTab } = this.state;

    //login control
    if (!isAuthenticated) {
    return (
        <div className="container">
        <Login />
        </div>
    );
    }

    let questionList = [];

    if (selectedTab === "unanswered") {
      questionList = unAnsweredQuestionIds;
    } else if (selectedTab === "answered") {
      questionList = answeredQuestionIds;
    }

    const listItems = questionList.map(question => {
      return <QuestionListItem key={question} id={question} />;
    });

    return (
      <div>
        <Tabs  defaultActiveKey="unanswered" onSelect={this.onSelect}>
          <Tab eventKey="unanswered" title="Unanswered Questions"></Tab>
          <Tab eventKey="answered" title="Answered Questions"></Tab>
        </Tabs>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

function mapStateToProps({authedUser,questions}) {
  const unAnsweredQuestionIds = Object.keys(questions)
      .filter((i) => (
          !questions[i].optionOne.votes.includes(authedUser) &&
          !questions[i].optionTwo.votes.includes(authedUser)
      ))
      .sort((a,b) => (
          questions[b].timestamp - questions[a].timestamp
      ))
      const answeredQuestionIds = Object.keys(questions)
      .filter((i) => (
          questions[i].optionOne.votes.includes(authedUser) ||
          questions[i].optionTwo.votes.includes(authedUser)
      ))
      .sort((a,b) => (
          questions[b].timestamp - questions[a].timestamp
      ))
  return {
      unAnsweredQuestionIds,
      answeredQuestionIds,
      isAuthenticated: authedUser !== null
  }
}

export default connect(mapStateToProps)(Dashboard)