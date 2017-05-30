import React,{Component} from "react";
import {PropTypes} from "prop-types";
import {merge} from "lodash-node";
import AnswerMultipleChoiceQuestion from './answer_multiple_choice_question';


class AnswerYesNoQuestion extends Component{
    render() {
        var choices = ["Yes", "No"];
        var props = merge({}, this.props, {
          choices: choices
        });
        return <AnswerMultipleChoiceQuestion {...props}/>;
    }
}

AnswerYesNoQuestion.propTypes={
    value: PropTypes.string,
    onCompleted: PropTypes.func.isRequired
}

export default AnswerYesNoQuestion;
