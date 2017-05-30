import React,{Component} from "react";
import {merge} from "lodash-node";
import EditQuestion from './edit_question';
import {PropTypes} from "prop-types";
import {List} from "immutable";

class EditMultipleChoiceQuestion extends Component{
    handleDescriptionChange(ev){
        var item = this.props.item.setIn(["meta","label"],ev.target.value);
        this.props.onChange(this.props.id, item);
    }

    handleOptionAdd() {
        var _choices = this.props.item.getIn(["meta","choices"]);
        var choices = (_choices || List([])).push("");
        var item = this.props.item.setIn(["meta","choices"],choices);

        this.props.onChange(this.props.id, item);
    }

    handleOptionChange(key, ev) {
        var item = this.props.item.setIn(["meta","choices",key],ev.target.value)
        this.props.onChange(this.props.id, item);
    }

    handleOptionRemove(key) {
        var _choices = this.props.item.getIn(["meta","choices"]);
        var choices = _choices.splice(key, 1);
        var item = this.props.item.setIn(["meta","choices"],choices);
        this.props.onChange(this.props.id, item);
    }

    handleRemove() {
        this.props.onRemove(this.props.id);
    }
    render() {
        var item = this.props.item;

        var description = item.getIn(["meta","label"]) || "";
        var options = item.getIn(["meta","choices"]) || List([]);

        options = options.map(function (option, i) {
          return (
            <li key={i} className='option'>
              <input
                type='text'
                className='small'
                value={option}
                onChange={this.handleOptionChange.bind(this, i)}
              />
              <a className='remove-option' onClick={this.handleOptionRemove.bind(this, i)}>
                <span className='glyphicon glyphicon-remove'/>
              </a>
            </li>
          );
        }.bind(this));

        return (
          <EditQuestion type='multiple_choice' className='edit-multiple-choice' onRemove={this.handleRemove.bind(this)}>
            <label>Description</label>
            <input type='text' className='description' value={description} onChange={this.handleDescriptionChange.bind(this)} />

            <label>Options</label>
            <ul className='options list-unstyled'>
              {options}
              <li className='add-option'>
                <a onClick={this.handleOptionAdd.bind(this)}>
                  <span className='glyphicon glyphicon-plus'/>
                  Add option
                </a>
              </li>
            </ul>
          </EditQuestion>
        );
    }
}

EditMultipleChoiceQuestion.propTypes = {
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

export default EditMultipleChoiceQuestion;
