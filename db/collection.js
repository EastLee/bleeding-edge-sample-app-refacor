import Mongolass from "mongolass";
var mongolass = new Mongolass();
mongolass.connect("mongodb://p-survey:lidong199010028@ds155411.mlab.com:55411/p-survey");

var Question = mongolass.model('Question');
Question.index({ id: 1 }).exec();// 根据用户名找到用户，用户名全局唯一


var Answer = mongolass.model('Answer');
Answer.index({ id: 1 }).exec();

export {
	Question,
	Answer
}