import React,{Component} from "react";

class About extends Component{
	render(){
		return (
			<div>
				<div>
					此页面本是《REACT：引领未来的用户界面开发框架》例子，不过所用技术仅仅是React+Flux，所以小生把它重构了一下！
				</div>
				<h3>
					技术栈
				</h3>
				<ol>
					<li>ES6</li>
					<li>React</li>
					<li>react-redux</li>
					<li>react-router（针对java后台可以分片加载，此处代码被注释）</li>
					<li>react-router-redux</li>
					<li>immutable（优化render）</li>
					<li>webpack</li>
					<li>express</li>
					<li>mongodb</li>
				</ol>
				<div>
					因为没有用到最频繁使用的jq和window方法，所以前后端同构并不完全。
				</div>
				<div>
					有问题请联系我：andalidong@gmail.com
				</div>
			</div>
		)
	}
}

module.exports = About;
