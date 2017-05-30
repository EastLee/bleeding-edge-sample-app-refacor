import React,{Component} from "react";
import {merge} from "lodash-node";

import YesNoQuestion from './answers/answer_yes_no_question';
import AnswerMultipleChoiceQuestion from './answers/answer_multiple_choice_question';
import EssayQuestion from './answers/answer_essay_question';
import {fromJS} from "immutable";

const answerTypeMap = {
  yes_no: (props)=><YesNoQuestion {...props}/>,
  multiple_choice: (props)=><AnswerMultipleChoiceQuestion {...props}/>,
  essay: (props)=><EssayQuestion {...props}/>
};

class TakeSurveyItem extends Component{
    handleItemCompleted(value) {
        this.props.onCompleted({
            id: this.props.item.get("id"),
            value: value
        })
    }
    renderSurveyItem() {
        // var props = merge({}, this.props.item.meta, {
        //   onCompleted: this.handleItemCompleted.bind(this)
        // });
        var props = this.props.item.get("meta").set("onCompleted",this.handleItemCompleted.bind(this));
        return answerTypeMap[this.props.item.get("type")](props.toJS());
    }
    render() {
        return (<div className="survey-item">
                    {this.renderSurveyItem()}
                </div>)
    }
}

TakeSurveyItem.defaultProps = {
    onCompleted: function() {},
    item: fromJS({})
}

export default TakeSurveyItem;
