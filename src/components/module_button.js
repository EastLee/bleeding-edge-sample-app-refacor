import React,{Component} from "react";
import PropTypes from 'prop-types';

class ModuleButton extends Component{
	handleDragStart(ev) {
    	ev.dataTransfer.setData('questionType', this.props.questionType);
  	}
	render() {
	    return (
	      <div draggable="true" className="btn btn-lg btn-secondary draggable" onDragStart={this.handleDragStart.bind(this)}>
	        <span className="glyphicon glyphicon-move" onClick={this.props.onClick}/>
	        {this.props.text}
	      </div>
	    );
  	}
}

ModuleButton.propTypes = {
	text: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired
}

export default ModuleButton;
