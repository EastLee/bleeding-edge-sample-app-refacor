import React,{Component} from "react";
import {PropTypes} from 'prop-types';
import {uniqueId} from "lodash-node";
import AnswerRadioInput from './answer_radio_input';

class AnswerMultipleChoiceQuestion extends Component{
    constructor(props){
        super(props);
        this.state = {
          id: uniqueId('multiple-choice-'),
          value: this.props.value
        };
    }
    handleChanged(value) {
        this.setState({value: value});
        this.props.onCompleted(value);
    }
    renderChoices() {
        var choices = this.props.choices||[];
        return choices.map(function(choice, i) {
            var props={
                key: i,
                id: "choice-" + i,
                name: this.state.id,
                label: choice,
                value: choice,
                checked: this.state.value === choice,
                onChanged: this.handleChanged.bind(this)
            };
            return <AnswerRadioInput {...props}/>
        }.bind(this));
    }
    render() {
        return (
          <div className="form-group">
            <label className="survey-item-label" htmlFor={this.state.id}>{this.props.label||''}</label>
            <div className="survey-item-content">
                {this.renderChoices()}
            </div>
          </div>
        );
    }
}

AnswerMultipleChoiceQuestion.propTypes={
    value: PropTypes.string,
    choices: PropTypes.array.isRequired,
    onCompleted: PropTypes.func.isRequired
}

export default AnswerMultipleChoiceQuestion;
