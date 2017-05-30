import React,{Component} from "react";
import SurveyTable from './survey_table';
import {connect} from 'react-redux';
import * as action from '../actions';
import {polyfill} from "es6-promise";
polyfill();
import 'isomorphic-fetch';

class ListSurveys extends Component{
    handleDel(id){
        var that = this;
        fetch("/delete",{
            method:"post",
            body: JSON.stringify({id:id}),
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response){
            if(response.status === 200){
                that.props.delqanda(id);
            }else{
                console.info(response.text);
            }
        })
    }
    render(){
        if(Object.keys(this.props.questions).length==0){
          return <div>have no surveys!</div>
        }
        return (
          <div className='list-surveys'>
            <h1>Active Surveys</h1>
            <SurveyTable answers={this.props.answers} surveys={this.props.questions} handleDel={this.handleDel.bind(this)}/>
          </div>
        );
    }
}

function mapStateToProps(state){
    const {questions,answers} = state;
    return {
        questions,
        answers
    }
}

module.exports = connect(mapStateToProps,action)(ListSurveys);
