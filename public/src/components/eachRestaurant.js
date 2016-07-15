import React, { Component } from 'react';
import LogInOut from './LogInOut'
import Reviews from './Reviews'


export default class EachRestaurant extends Component {

	constructor(props){
		super(props)

	}

  render() {

  	var divStyle = {
  		borderBottom: "1px solid darkgrey",
	};

	var nameStyle = {
  		color: 'blue',
  		fontWeight: 'bold',
	};

	var imgStyle = {
		float: 'left',
		padding: '10px',
		height: '125px',
    	width: '125px'
	}

	var revStyle = {
		float: 'right',
	}

	var health = {
		color: 'green',
		float: 'right'
	}

	var showStars;
		if (this.props.restaurant_info.averageReview) {
			if(this.props.restaurant_info.averageReview > 4) {
				showStars = '✦✦✦✦✦'
			} else if(this.props.restaurant_info.averageReview > 3) {
				showStars = '✦✦✦✦✧'
			} else if(this.props.restaurant_info.averageReview > 2) {
				showStars = '✦✦✦✧✧'	
			} else if(this.props.restaurant_info.averageReview > 1) {
				showStars = '✦✦✧✧✧'
			} else if(this.props.restaurant_info.averageReview > 0) {
				showStars = '✦✧✧✧✧'
			} 
		}


    return (
      <div className = 'eachRestaurant' style={divStyle}>
     	<div style={revStyle}>{this.props.restaurant_info.averageReview ? showStars + '  ' + this.props.restaurant_info.reviewerTotal + ' reviews' : 'Be the first to review!'}
     	</div>
      	<img style={imgStyle} src='http://www.tastelikehome.co.za/wp-content/uploads/2015/10/cpg-foods-icon.png'/> 
      	<div style={nameStyle}><p><a href = {this.props.restaurant_info.MENU_WEBSITE} target='_blank'>  {this.props.restaurant_info.NAME}</a></p></div>
		<p>Terminal {this.props.restaurant_info.TERMINAL} ⋅ Near gate(s): {this.props.restaurant_info.NEAR_GATE}</p>
		<p>Hours: {this.props.restaurant_info.OPEN} - {this.props.restaurant_info.CLOSE}</p>
		<p>{this.props.restaurant_info.PRICE} ⋅ {this.props.restaurant_info.TYPE} ⋅ {this.props.restaurant_info.SPEED} <span style={health}>{ this.props.restaurant_info.GF ? ' 🌱GF  ' : null} { this.props.restaurant_info.Vegetarian ? ' 🌱Vegetarian  ' : null}</span></p>
	  </div>

    );
  }
}