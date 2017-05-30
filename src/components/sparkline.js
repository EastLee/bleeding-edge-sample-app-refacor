import React,{Component} from "react";
import PropTypes from 'prop-types';

class Sparkline extends Component{
	generatePath(width, height, points) {
	    var maxHeight = points.max();
	    var maxWidth = points.size;

	    return points.map(function (p, i) {
	      var xPct = i / maxWidth * 100;
	      var x = (width / 100) * xPct;

	      var yPct = 100 - (p / maxHeight * 100);
	      var y = (height / 100) * yPct;

	      if (i === 0) {
	        return 'M0,' + y;
	      }
	      else {
	        return 'L' + x + ',' + y;
	      }
	    }).join(' ');
  	}
	render() {
	    var width = 200;
	    var height = 20;

	    var path = this.generatePath(width, height, this.props.points);

	    return (
	      <svg width={width} height={height}>
	        <path d={path} stroke='#7ED321' strokeWidth='2' fill='none'/>
	      </svg>
	    );
    }
}

Sparkline.propTypes={
    points: PropTypes.object.isRequired
}

export default Sparkline;
