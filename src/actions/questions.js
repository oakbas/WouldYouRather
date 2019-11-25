import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

function addAnswer (answer) {
  return {
    type: ADD_ANSWER,
    answer,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { author } = getState()
    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
        console.log('Add Answer action failed.')
      })
  }
}

export function handleAddAnswer (qId, answer, author) {
  return (dispatch) => {
    dispatch(showLoading())

    return saveQuestionAnswer({
      author,
      qId,
      answer,
    })
      .then((answer) => dispatch(addAnswer(answer)))
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
        console.log('Add Answer action failed.')
      })
  }
}