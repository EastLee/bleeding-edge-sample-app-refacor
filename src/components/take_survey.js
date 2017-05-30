import React,{Component} from "react";
import {PropTypes} from 'prop-types';
import TakeSurveyItem from "./take_survey_item";
import {fromJS} from "immutable";

class TakeSurvey extends Component{
	constructor(props){
		super(props);
		this.state = {
			results: fromJS({})
		}
	}
	handleItemCompleted(params) {
	    var _results = this.state.results;
	    // results[params.id] = params.value;
	    // this.setState({
	    //   results: results
	    // });
	    this.state.results = _results.set([params.id],params.value);
  	}
  	handleClick() {
    	this.props.onSave(this.state.results);
  	}
  	renderItems() {
  		var questions = this.props.questions||fromJS({});
  		var items = questions.get("items")||fromJS([]);
	    return items.map(function(item) {
	      var props = {
	        key: item.get("id"),
	        item: item,
	        onCompleted: this.handleItemCompleted.bind(this)
	      };
	      return <TakeSurveyItem {...props}/>
	    }.bind(this));
  	}
  	render(){
  		var questions = this.props.questions||fromJS({});
	    return (
	      <div className="survey">
	        <h1>{questions.get("title")||''}</h1>
	        <p>{questions.get("description")||''}</p>
	        {this.renderItems()}
	        <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Submit</button>
	      </div>
	    );
  	}
}

TakeSurvey.propTypes = {
	items: PropTypes.object,
    onSave: PropTypes.func.isRequired
}

export default TakeSurvey;
