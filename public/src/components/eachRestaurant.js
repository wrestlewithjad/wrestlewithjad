import React, { Component } from 'react';
import LogInOut from './LogInOut'
import Reviews from './Reviews'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import {fetchSessionID} from '../actions/actions';

class EachRestaurant extends Component {

	constructor(props){
		super(props)

	}

  render() {

  	var eachRest = this.props.restaurant_info
  	//console.log("INFO",this.props.restaurant_info)

  	var divStyle = {
  		borderBottom: "1px solid darkgrey",
  		width: '70%',
  		height: '126px',
	};

	var pstyle = {
		lineHeight: '50%'
	}

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
	}

	var tags = {
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
      <div className = 'eachRestaurant'>
     	<div style={revStyle}>{this.props.restaurant_info.averageReview ? showStars + '  ' + this.props.restaurant_info.reviewerTotal + ' reviews' : 'Be the first to review!'}
		{this.props.sessionID?<Reviews restaurant_info = {eachRest} />:null}
     	</div>
      	{this.props.restaurant_info.LOGO?<img style ={imgStyle} src={this.props.restaurant_info.LOGO}/> :<img style={imgStyle} src='http://www.tastelikehome.co.za/wp-content/uploads/2015/10/cpg-foods-icon.png'/> }
      	<div style={nameStyle}><p><a href = {this.props.restaurant_info.MENU_WEBSITE} target='_blank'>  {this.props.restaurant_info.NAME}</a></p></div>
		<div style={pstyle}><p>Terminal {this.props.restaurant_info.TERMINAL} ⋅ Near gate(s): {this.props.restaurant_info.NEAR_GATE}</p>
		<p>Hours: {this.props.restaurant_info.OPEN} - {this.props.restaurant_info.CLOSE}</p>
		<p>{this.props.restaurant_info.PRICE} ⋅ {this.props.restaurant_info.TYPE} ⋅ {this.props.restaurant_info.SPEED} <span style={tags}>{ this.props.restaurant_info.Alcohol === "YES" ? ' 🍸Alcohol ' : null}<span style={health}>{ this.props.restaurant_info.GF ? ' 🌱GF  ' : null} { this.props.restaurant_info.Vegetarian ? ' 🌱Vegetarian  ' : null}</span></span></p></div>
	  </div>

    );
  }
}
function mapStateToProps(state){
  return {sessionID : state.sessionID}
}

export default connect(mapStateToProps)(EachRestaurant)