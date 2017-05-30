import React,{Component} from "react";
import {Link} from "react-router";
import Sparkline from './sparkline';

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var formatDate = function (date) {
  if(typeof date === "string"){
    date = new Date(date);
  }
  return MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
};

function integerWithThousandsSeparator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class SurveyTableRow extends Component{
    handleClick(){
        this.props.handleDel(this.props.survey.get("id"));
    }
    render() {
        var survey = this.props.survey;
        var answers = this.props.answers;
        var id = answers&&answers[survey.get("id")];

        var total = survey.get("activity").reduce(function (memo, n) {
          return memo + n;
        }, 0);

        return (
          <tr>
            <td>
              <Link to={`/surveys/${survey.get("id")}`} className='title'>
                {survey.get("title")}
              </Link>
            </td>
            <td className='published'>{formatDate(survey.get("createdAt"))}</td>
            <td className='modified'>{formatDate(survey.get("updatedAt"))}</td>
            <td className='total'>{integerWithThousandsSeparator(total)}</td>
            <td className='activity'>
              <Sparkline points={survey.get("activity")} />
            </td>
            <td>
              <Link to={`/surveys/${survey.get("id")}/edit`} className="btn btn-link btn-editSurvey edit">
                <i className="glyphicon glyphicon-pencil"></i>
              </Link>
            </td>
            <td>
              {id?(<Link to={`/surveys/${survey.get("id")}/answer`} className="btn btn-link btn-editSurvey edit">
                结果
              </Link>):"未作答"}
            </td>
            <td>
              <span className="del" onClick={this.handleClick.bind(this)}>删除</span>
            </td>
          </tr>
        );
    }
}

export default SurveyTableRow;
