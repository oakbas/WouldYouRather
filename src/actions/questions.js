import { saveQuestionAnswer, saveQuestion } from '../utils/api'
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

function addAnswer ({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer
  }
}

function addQuestion ( question ) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddAnswer (info) {
  return (dispatch) => {
    dispatch(addAnswer(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        alert('Error while saving question answer')
      })
  }
}

export function handleAddQuestion (question) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return saveQuestion({
      optionOneText: question.optionOne,
      optionTwoText: question.optionTwo,
      author: authedUser
    })
    .then((question) => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading()))
    .catch((e) => {
      alert('Error while saving a new question')
    })
  }
}