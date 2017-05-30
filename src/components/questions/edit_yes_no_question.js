import React,{Component} from "react";
import {merge} from 'lodash-node';
import EditQuestion from './edit_question';
import PropTypes from "prop-types";

class EditYesNoQuestion extends Component{
    handleChange(ev) {
        var item = this.props.item.setIn(["meta","label"],ev.target.value);
        this.props.onChange(this.props.id, item);
    }
    handleRemove() {
        this.props.onRemove(this.props.id);
    }
    render() {
        var description = this.props.item.getIn(["meta","label"]) || "";

        return (
          <EditQuestion type='yes_no' onRemove={this.handleRemove.bind(this)}>
            <label>Description</label>
            <input type='text' className='description' value={description} onChange={this.handleChange.bind(this)} />
          </EditQuestion>
        );
    }
}

EditYesNoQuestion.propTypes={
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

export default EditYesNoQuestion;

