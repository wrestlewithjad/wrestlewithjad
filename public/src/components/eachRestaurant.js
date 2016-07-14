import React, { Component } from 'react';
import LogInOut from './LogInOut'


export default class EachRestaurant extends Component {
  render() {

  	var divStyle = {
  		borderBottom: "1px solid darkgrey",
  		maxWidth: '600px',
  		maxHeight: '150px',
  		lineSpacing: '0em'
	};

	var nameStyle = {
  		color: 'blue',
  		fontWeight: 'bold',
	};

	var imgStyle = {
		float: 'left',
		paddingRight: '10px',
		height: '125px',
    	width: '125px'
	}

  	console.log(this.props.restaurant_info)
    return (
      <div style={divStyle}>
      	<img style={imgStyle} src='http://www.tastelikehome.co.za/wp-content/uploads/2015/10/cpg-foods-icon.png'/>
		<div style={nameStyle}><p>{this.props.restaurant_info.NAME}</p></div>
		<p>Terminal {this.props.restaurant_info.TERMINAL} ⋅ Near gate(s): {this.props.restaurant_info.NEAR_GATE}</p>
		<p>Hours: {this.props.restaurant_info.OPEN} - {this.props.restaurant_info.CLOSE}</p>
		<p>{this.props.restaurant_info.PRICE} ⋅ {this.props.restaurant_info.TYPE} ⋅ {this.props.restaurant_info.SPEED}</p>
      </div>

    );
  }
}