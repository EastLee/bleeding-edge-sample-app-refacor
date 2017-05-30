import React,{Component} from "react";
import {fromJS} from "immutable";
import {connect} from "react-redux";

class AnswerShow extends Component{
	constructor(props){
		super(props);
		this.questions = this.props.questions[this.props.params["surveyId"]];
		this.answers = this.props.answers[this.props.params["surveyId"]];
	}
	renderItems(){
		if(!this.questions){
			return null;
		}
		return this.questions.get("items").map(function(q,i){
			return(
				<div className="form-group" key={i}>
					<label className="survey-item-label">{`${q.getIn(["meta","label"])}`}</label>
					<div>{`答：${this.answers.toJS()[q.get("id")]}`}</div>
				</div>
			)
		}.bind(this))
	}
  	render(){
  		var questions = this.questions||fromJS({});
	    return (
	      <div className="survey">
	        <h1>{questions.get("title")||''}</h1>
	        <p>{questions.get("description")||''}</p>
	        {this.renderItems()}
	      </div>
	    );
  	}
}

function mapStateToProps(state){
	const {questions,answers} = state;
	return {
		questions,
		answers
	}
}

module.exports = connect(mapStateToProps)(AnswerShow);
