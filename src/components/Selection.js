import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { handleAddAnswer } from '../actions/questions'
import { connect } from 'react-redux'

class Selection extends Component {
    state = {
        selectedOption: ""
    };

    onOptionSelect = (event) => {
        this.setState({ selectedOption: event.target.value })
    }

    onSubmit = selectedOption => {
        const { dispatch, id, authedUser } = this.props;
        if (selectedOption !== "") {
            dispatch(handleAddAnswer({
                authedUser,
                qid: id,
                answer: this.state.selectedOption
              }))    
            }
      };

    handleSubmit = event => {
        event.preventDefault()
        const {dispatch,authedUser,id} = this.props

        if(this.state.selectedOption !== null) {
            dispatch(handleAddAnswer({
                authedUser,
                qid: id,
                answer: this.state.selectedOption
              }))
        }
    }
    
    render() {
        const { optionOne, optionTwo } = this.props;

        return (
            <div>
                <Card>
                    <Card.Header>Would You Rather...</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div>
                            <label>
                                <input
                                type="radio"
                                value="optionOne"
                                checked={this.state.selectedOption === 'optionOne'}
                                onChange={this.onOptionSelect}
                            />
                            {optionOne}
                            </label>
                            <label>
                                <input
                                type="radio"
                                value="optionTwo"
                                checked={this.state.selectedOption === 'optionTwo'}
                                onChange={this.onOptionSelect}
                            />
                            {optionTwo}
                            </label>
                            </div>
                        </Card.Text>
                        <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

function mapStateToProps({ authedUser}, {id}) {
    return {
      id,
      authedUser
    };
  }
  
  export default connect(mapStateToProps)(Selection);