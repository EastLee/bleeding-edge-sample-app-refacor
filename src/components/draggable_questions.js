import React,{Component} from "react";
import ModuleButton from './module_button';

class DraggableQuestions extends Component{
	shouldComponentUpdate() {
	   	return false;
	}
	render() {
	    return (
	      <ul className="modules list-unstyled">
	        <li><ModuleButton text='Yes / No' questionType='yes_no'/></li>
	        <li><ModuleButton text='Multiple choice' questionType='multiple_choice'/></li>
	        <li><ModuleButton text='Essay' questionType='essay'/></li>
	      </ul>
	    );
  	}
}

export default DraggableQuestions;
