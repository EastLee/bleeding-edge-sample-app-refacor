import * as ActionTypes from "../constants";

export function saveSurveyQuestion(value){
	return {
		type: ActionTypes.ADD_TO_SURVEYQUESTION,
		value
	}
}

export function updateSurveyQuestion(value){
	return {
		type: ActionTypes.UPDATE_TO_SURVEYQUESTION,
		value
	}
}

export function saveSurveyAnswers(value){
	return {
		type: ActionTypes.ADD_TO_SURVEYANSWERS,
		value
	}
}

export function delqanda(value){
	return {
		type: ActionTypes.DEL_AND_QA,
		value
	}
}