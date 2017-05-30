import React,{Component} from "react";

class Divider extends Component{
	render() {
	    var text;
	    if (this.props.children) {
	      text = <h2>{this.props.children}</h2>
	    }

	    return (
	      <div className="divider clearfix">
	        {text}<hr />
	      </div>
	    );
    }
}

export default Divider;
