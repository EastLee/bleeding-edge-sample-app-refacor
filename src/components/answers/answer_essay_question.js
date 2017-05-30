import React,{Component} from "react";
import {PropTypes} from "prop-types";

class AnswerEssayQuestion extends Component{
    handleComplete(event) {
        this.props.onCompleted(event.target.value);
    }
    render() {
        return (
          <div className="form-group">
            <label className="survey-item-label">{this.props.label}</label>
            <div className="survey-item-content">
              <textarea className="form-control" rows="3" onBlur={this.handleComplete.bind(this)}/>
            </div>
          </div>
        );
    }
}

AnswerEssayQuestion.defaultProps = {
    value: ''
}

AnswerEssayQuestion.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    onCompleted: PropTypes.func.isRequired
}

export default AnswerEssayQuestion;
