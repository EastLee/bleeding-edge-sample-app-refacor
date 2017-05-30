import React,{Component} from "react";
import PropTypes from "prop-types";

const typeLabels = {
  yes_no: 'Yes / No',
  multiple_choice: 'Multiple Choice',
  essay: 'Essay'
};

class EditQuestion extends Component{
    getTypeLabel() {
        return typeLabels[this.props.type];
    }
    handleRemove() {
        if (confirm('Are you sure you want to delete this ' + this.getTypeLabel())) {
          this.props.onRemove();
        }
    }
    render() {
        var className = 'edit-question well well-active ' + (this.props.className || "");

        return (
          <div className={className}>
            <div className='type'>
              {this.getTypeLabel()}
              <a className='remove' onClick={this.handleRemove.bind(this)}>
                <span className='glyphicon glyphicon-remove'/>
              </a>
            </div>
            <div>{this.props.children}</div>
          </div>
        );
    }
}

EditQuestion.propTypes = {
    type: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default EditQuestion;
