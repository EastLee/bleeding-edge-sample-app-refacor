import React,{Component} from 'react';
import addons,{CSSTransitionGroup} from 'react-addons';
import ReactCSSTransitionGroup from "react-addons/lib/ReactCSSTransitionGroup";
import {connect} from "react-redux";
import * as action from '../actions';
import genId from "../util/genId";
import {List,fromJS,is} from "immutable";
import {polyfill} from "es6-promise";
polyfill();
import 'isomorphic-fetch';

import Divider from './divider';
import DraggableQuestions from './draggable_questions';
import SurveyForm from './survey_form';

import EditYesNoQuestion from './questions/edit_yes_no_question';
import EditMultipleChoiceQuestion from './questions/edit_multiple_choice_question';
import EditEssayQuestion from './questions/edit_essay_question';


var SUPPORTED_QUESTIONS = {
  yes_no:           (props)=><EditYesNoQuestion {...props}/>,
  multiple_choice:  (props)=><EditMultipleChoiceQuestion {...props}/>,
  essay:            (props)=><EditEssayQuestion {...props}/>
};

class SurveyEditor extends Component{
    constructor(props){
        super(props);
        var id = this.props.params["surveyId"];
        var _id = genId()
        this.state = id&&this.props.questions[id]?{[id]:this.props.questions[id]}:{[_id]:fromJS({
            dropZoneEntered:false,
            title:'',
            description:'',
            activity:[Math.floor(Math.random()*100)],
            items:[],
            createdAt:new Date(),
            updatedAt:new Date(),
            id:_id
        })};
        if(id&&this.props.questions[id]){
            this.id = id;
        }else{
            this.id = _id;
        }
    }
    handleFormChange(formData) {

        this.setState({
            [this.id]:this.state[this.id].mergeDeep(fromJS(formData))
        });
    }
    handleQuestionChange(key, newQuestion) {
        // var arr = this.state.items.concat();
        // arr.splice(key, 1, newQuestion);
        var items = this.state[this.id].get("items").splice(key,1,fromJS(newQuestion));
        var _state = this.state[this.id].set("items",items);
        this.setState({ [this.id]: _state });
    }
    handleQuestionRemove(key) {
        // var arr = this.state.items.concat();
        // arr.splice(key, 1);
        // var items = this.state.items.splice(key,1);
        // this.setState({ items: items });

        var items = this.state[this.id].get("items").splice(key,1);
        var _state = this.state[this.id].set("items",items);
        this.setState({ [this.id]: _state });
    }
    handleDragOver(ev) {
        ev.preventDefault();
    }
    handleDragEnter() {
        var _state = this.state[this.id].set("dropZoneEntered",true);
        this.setState({[this.id]: _state});
    }
    handleDragLeave() {
        // this.setState({dropZoneEntered: false});
        var _state = this.state[this.id].set("dropZoneEntered",false);
        this.setState({[this.id]: _state});
    }
    handleDragEnd(ev){
        ev.dataTransfer.clearData('questionType');
    }
    handleDrop(ev) {
        var questionType = ev.dataTransfer.getData('questionType');
        // var items = [...this.state.items,{ id:genId(), type: questionType,meta:{} }]
        var items = this.state[this.id].get("items").push(fromJS({ id:genId(), type: questionType,meta:{}}));
        // this.setState({
        //   items: items,
        //   dropZoneEntered: false
        // });
        var _state = this.state[this.id].set("items",items).set("dropZoneEntered",false);
        this.setState({ [this.id]: _state });
    }
    handleSaveClicked(ev) {
        var id = this.props.params["surveyId"];
        var _state = null;
        var that = this;
        if(id){
            // var arr = this.state["activity"].concat();
            // arr.push(Math.floor(Math.random()*100));
            // this.props.updateSurveyQuestion({
            //     id,
            //     createdAt:    this.state["createdAt"],
            //     updatedAt:    new Date(),
            //     title:        this.state.title,
            //     description:  this.state.description,
            //     activity:     this.state.activity.push(Math.floor(Math.random()*100)),
            //     items:        this.state.items
            // });
            var _diff = fromJS({
                activity: this.state[this.id].get("activity").push(Math.floor(Math.random()*100)),
                updatedAt: new Date()
            });
            _state = this.state[this.id].mergeDeep(_diff);
            
            fetch("/updatequestion",{
                method:"post",
                body: JSON.stringify(_state.toJS()),
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response){
                if(response.status === 200){
                    that.props.updateSurveyQuestion({
                        [that.id]: _state
                    })
                    that.props.router.replace("/");
                }else{
                    console.info(response.text);
                }
            })
        }else{
            // this.props.saveSurveyQuestion({
            //     id:           genId(),
            //     createdAt:    new Date(),
            //     updatedAt:    new Date(),
            //     title:        this.state.title,
            //     description:  this.state.description,
            //     activity:     this.state.activity.push(Math.floor(Math.random()*100)),
            //     items:        this.state.items
            // });
            _state = this.state[this.id].delete("dropZoneEntered");
            

            fetch("/addquestion",{
                method:"post",
                body: JSON.stringify(_state.toJS()),
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response){
                if(response.status === 200){
                    that.props.saveSurveyQuestion({
                        [that.id]: _state
                    });
                    that.props.router.replace("/");
                }else{
                    console.info(response.text);
                }
            })
        }
        
        // this.props.router.replace("/");
    }
    shouldComponentUpdate(np,ns){
        var tp = fromJS(this.props);
        var np = fromJS(np);
        var ts = fromJS(this.state);
        var ns = fromJS(ns);
        return !is(tp,np)||!is(ts,ns);
    }
    render() {
        var questions = this.state[this.id].get("items").map((q, i)=>{
          return SUPPORTED_QUESTIONS[q.get("type")]({
            key: i,
            id:i,
            onChange: this.handleQuestionChange.bind(this),
            onRemove: this.handleQuestionRemove.bind(this),
            item: q
          });
        });

        return (
          <div className='survey-editor'>
            <div className='row'>
              <aside className='sidebar col-md-3'>
                <h2>Modules</h2>
                <DraggableQuestions />
              </aside>

              <div className='survey-canvas col-md-9'>
                <SurveyForm
                  title={this.state[this.id].get("title")}
                  description={this.state[this.id].get("description")}
                  onChange={this.handleFormChange.bind(this)}
                />
                <Divider>Questions</Divider>
                {/*<ReactCSSTransitionGroup transitionName='question' component="div">
                  {[]}
                </ReactCSSTransitionGroup>*/}

                <div
                  className={'drop-zone well well-drop-zone ' + (this.state[this.id].get("dropZoneEntered")?'drag-enter':'')}
                  onDragOver={this.handleDragOver.bind(this)}
                  onDragEnter={this.handleDragEnter.bind(this)}
                  onDragLeave={this.handleDragLeave.bind(this)}
                  onDrop={this.handleDrop.bind(this)}
                  onDragEnd={this.handleDragEnd.bind(this)}
                >
                  Drag and drop a module from the left
                </div>
                <div className='survey-con'>
                    {questions}
                </div>
                <div className='actions'>
                  <button className="btn btn-lg btn-primary btn-save" onClick={this.handleSaveClicked.bind(this)}>Save</button>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
function mapStateToProps(state){
    const {questions} = state;
    return {
        questions
    }
}
module.exports = connect(mapStateToProps,action)(SurveyEditor);
