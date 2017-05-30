import "babel-polyfill"
import React from "react";
import {Router,Route,NotFound,IndexRoute,browserHistory} from "react-router";
import {App, ListSurveys,TakeSurveyCtrl,SurveyEditor,NotFoundHandler,AnswerShow,About} from "../components";

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={ListSurveys} />
		<Route path="/surveys" component={SurveyEditor} />
		<Route path="/surveys/:surveyId" component={TakeSurveyCtrl} />
		<Route path="/surveys/:surveyId/edit" component={SurveyEditor} />
		<Route path="/surveys/:surveyId/answer" component={AnswerShow} />
		<Route path="/about" component={About} />
	</Route>
)


//java后台模板使用分片加载
// const routes = {
// 	path:"/",
// 	getComponent:(location, cb)=>{
// 		require.ensure([],(require)=>{
// 			cb(null,require("../components/app"))
// 		})
// 	},
// 	indexRoute:{
// 		getComponent:(location,cb)=>{
// 			require.ensure([],(require)=>{
// 				cb(null,require("../components/list_surveys"))
// 			})
// 		}
// 	},
// 	childRoutes:[{
// 		path:"/surveys",
// 		getComponent:(location, cb)=>{
// 			require.ensure([],(require)=>{
// 				cb(null,require("../components/survey_editor"))
// 			})
// 		}
// 	},{
// 		path:"/surveys/:surveyId",
// 		getComponent:(location, cb)=>{
// 			require.ensure([],(require)=>{
// 				cb(null,require("../components/take_survey_ctrl"))
// 			})
// 		}
// 	},{
// 		path:"/surveys/:surveyId/edit",
// 		getComponent:(location, cb)=>{
// 			require.ensure([],(require)=>{
// 				cb(null,require("../components/survey_editor"))
// 			})
// 		}
// 	},{
// 		path:"/surveys/:surveyId/answer",
// 		getComponent:(location, cb)=>{
// 			require.ensure([],(require)=>{
// 				cb(null,require("../components/answerShow"))
// 			})
// 		}
// 	},{
// 		path:"/about",
// 		getComponent:(location, cb)=>{
// 			require.ensure([],(require)=>{
// 				cb(null,require("../components/about"))
// 			})
// 		}
// 	}]
// }


export default routes;
