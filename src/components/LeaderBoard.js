import React, { Component } from "react"
import { connect } from 'react-redux'
import LeaderBoardListItem from "./LeaderBoardListItem"
import Login from './Login'

class LeaderBoard extends Component {
  
  render() {
    const { userScoreList, isAuthenticated } = this.props;
    
    //login control
    if (!isAuthenticated) {
      return (
        <div className="container">
        <Login />
        </div>
      );
    }

    const LeaderBoardList = userScoreList.map(score => {
      return <LeaderBoardListItem key={score.id} score={score} />;
    });

    return (
      <div>
        <ul>{LeaderBoardList}</ul>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  let userScoreList = []
  const userIds = Object.keys(users)
  
  userIds.map((id) => (
    userScoreList.push({
      id: users[id].id,
      total: users[id].questions.length + (Object.keys(users[id].answers).length),
      answerCount: (Object.keys(users[id].answers).length),
      questionCount: users[id].questions.length 
    })
  ))

  userScoreList.sort((b, a) => (a.total) - (b.total))

  return {
    userScoreList,
    isAuthenticated: authedUser !== null
  }
}

export default connect(mapStateToProps)(LeaderBoard);