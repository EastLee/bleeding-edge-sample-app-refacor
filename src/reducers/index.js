import * as ActionTypes from "../constants";


export function questions(state={},action){
	switch(action.type){
		case ActionTypes.ADD_TO_SURVEYQUESTION:
			return Object.assign({},state,action.value);
		case ActionTypes.UPDATE_TO_SURVEYQUESTION:
			return Object.assign({},state,action.value)
		case ActionTypes.DEL_AND_QA:
			delete state[action.value];
			return Object.assign({},state);
		default:
			return state;
	}
}

export function answers(state={},action){
	switch(action.type){
		case ActionTypes.ADD_TO_SURVEYANSWERS:
			return Object.assign({},state,action.value);
		case ActionTypes.DEL_AND_QA:
			delete state[action.value];
			return Object.assign({},state); 
		default:
			return state;
	}
}