import React,{Component} from "react";
import {connect} from "react-redux";
import TakeSurvey from "./take_survey";
import * as action from '../actions';
import {polyfill} from "es6-promise";
polyfill();
import 'isomorphic-fetch';

class TakeSurveyCtrl extends Component{
	handleSurveySave(results) {
      var that = this;
      var _state = results.merge({id:this.props.params.surveyId});
      fetch("/addanswer",{
          method:"post",
          body: JSON.stringify(_state.toJS()),
          credentials: "same-origin",
          headers: {
              "Content-Type": "application/json"
          }
      }).then(function(response){
          if(response.status === 200){
              that.props.saveSurveyAnswers({
                  [that.props.params.surveyId]:_state
              })
              that.props.router.replace(`/surveys/${that.props.params.surveyId}/answer`);
          }else{
              console.info(response.text);
          }
      })
    }
  	render() {
	    return <TakeSurvey questions={this.props.questions[this.props.params.surveyId]} onSave={this.handleSurveySave.bind(this)}/>;
  	}
}

function mapStateToProps(state){
	const {questions} = state;
	return {
		questions
	}
}

module.exports = connect(mapStateToProps,action)(TakeSurveyCtrl);
