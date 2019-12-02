import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

class PollResults extends Component {
  render() {
    const { optionOneCount, optionTwoCount, optionOne, optionTwo, userAnswer} = this.props;
    const totalCount = optionOneCount + optionTwoCount;
    let optionOneText = optionOneCount + ' out of '+ totalCount;
    let optionTwoText = optionTwoCount + ' out of '+ totalCount;
    let optionOneIsActive = false;
    let optionTwoIsActive = false;
    if (userAnswer === "optionOne") {
        optionOneIsActive = true;
    }
    else if (userAnswer === "optionTwo"){
        optionTwoIsActive = true;
    }

    return (
      <div>
        <h4>Results:</h4>
        <h5>{optionOne}</h5>
        {optionOneIsActive ?
        <Alert variant="success">Your Vote Is One</Alert> : <div></div> }
        <p>{optionOneText}</p>
        <h5>{optionTwo}</h5>
        {optionTwoIsActive ?
        <Alert variant="success">Your Vote Is Two</Alert> : <div></div> }
        <p>{optionTwoText}</p>

      </div>
    );
  }
}

export default PollResults;