import React, {Component} from "react";
import {PropTypes} from "prop-types";

class SurveyForm extends Component{
    handleTitleChange(ev) {
        this.props.onChange({ title: ev.target.value });
    }

    handleIntroductionChange(ev) {
        this.props.onChange({ description: ev.target.value });
    }
    render() {
        return (
          <div>
            <h2>Title</h2>
            <input
              className='title'
              type='text'
              value={this.props.title}
              onChange={this.handleTitleChange.bind(this)} />

            <h2>Introduction</h2>
            <textarea
              className='introduction'
              value={this.props.description}
              onChange={this.handleIntroductionChange.bind(this)} />
          </div>
        );
    }
}

SurveyForm.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string
}

export default SurveyForm;
