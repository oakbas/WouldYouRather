import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import Login from './Login'

class AddQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        isFormSubmitted: false
    }

    onOptionOneChange = (event) => {
        this.setState({ optionOne: event.target.value })
    }

    onOptionTwoChange = (event) => {
        this.setState({ optionTwo: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { optionOne, optionTwo } = this.state;
        const { dispatch } = this.props;
    
        this.setState({
            isFormSubmitted: true
        });
    
        dispatch(handleAddQuestion({ optionOne, optionTwo }));
    };

    render() {
        const { optionOne, optionTwo, isFormSubmitted } = this.state;
        const { isAuthenticated } = this.props;

        //login control
        if (!isAuthenticated) {
            return (
                <div className="container">
                <Login />
                </div>
            );
        }

        if (isFormSubmitted) {
            return <Redirect to="/" />;
        }

        return(
        <div>
            <Card>
                <Card.Header>Add New Question</Card.Header>
                <Card.Body>
                    <Card.Title>Woul you rather...</Card.Title>
                    <Card.Text>
                        <input
                        type="text"
                        placeholder="Type option one"
                        value={this.state.optionOne}
                        onChange={this.onOptionOneChange}>
                        </input>
                        <p>OR</p>
                        <input
                        type="text"
                        placeholder="Type option two"
                        value={this.state.optionTwo}
                        onChange={this.onOptionTwoChange}>
                        </input>
                        <br />
                    </Card.Text>
                    <Button variant="primary" disabled={optionOne === "" || optionTwo === ""} onClick={this.handleSubmit}>
                        Submit
                    </Button>
                    </Card.Body>
                </Card>
            </div>
            )
        }
    }
    
    function mapStateToProps({ authedUser}){
        return {
            isAuthenticated: authedUser !== null
        }
    }

    export default connect(mapStateToProps)(AddQuestion)