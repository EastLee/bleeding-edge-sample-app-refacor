import React,{Component} from "react";
import {PropTypes} from 'prop-types';
import {uniqueId} from "lodash-node";

class AnswerRadioInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked: !!this.props.checked
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.checked !== undefined) {
            this.setState({
                checked: nextProps.checked
            });
        }
    }
    handleChanged(e) {
        var checked = e.target.checked;
        this.setState({checked: checked});
        if(checked) {
            this.props.onChanged(this.props.value);
        }
    }
    render() {
        return (
          <div className="radio">
            <label>
              <input type="radio"
                name={this.props.name}
                id={this.props.id}
                value={this.props.value}
                checked={this.state.checked}
                onChange={this.handleChanged.bind(this)} />
              {this.props.label}
            </label>
          </div>
        );
    }
}

AnswerRadioInput.defaultProps = {
    id: uniqueId('radio-'),
    checked: false
}

AnswerRadioInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool
}

export default AnswerRadioInput;
