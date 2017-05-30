import React,{Component} from "react";
import SurveyTableRow from './survey_table_row';
import PropTypes from 'prop-types';

class SurveyTable extends Component{
    render() {
        var rows = Object.keys(this.props.surveys).map(function(key, i) {
          return <SurveyTableRow key={i} answers={this.props.answers} survey={this.props.surveys[key]} handleDel={this.props.handleDel}/>;
        }.bind(this));

        return (
          <table className="table survey-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Published On</th>
                <th>Last Active</th>
                <th>Completions</th>
                <th>Activity</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        );
    }
}

SurveyTable.propTypes={
    surveys: PropTypes.object.isRequired
}

export default SurveyTable;
