import React, {Component} from 'react';
import axios from 'axios';
import RestaurantList from './RestaurantList'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import {fetchRestaurants} from '../actions/actions';


class Reviews extends Component {
	constructor(props){
		super(props)
		this.state={
			numGreen:this.props.restaurant_info.userScore
		}
	}	//The buttons are green is the state numGreen is larger than a specific number
	render(){
		return(
			<div>
				<form>
				<div>
					<button className = {this.state.numGreen > 0?'btn btn-success':'btn'} onClick = {this.buttonClick.bind(this)} value = {1} type = 'button'>✦</button>
					<button className = {this.state.numGreen > 1?'btn btn-success':'btn'} onClick = {this.buttonClick.bind(this)} value = {2} type = 'button'>✦</button>
					<button className = {this.state.numGreen > 2?'btn btn-success':'btn'} onClick = {this.buttonClick.bind(this)} value = {3} type = 'button'>✦</button>
					<button className = {this.state.numGreen > 3?'btn btn-success':'btn'} onClick = {this.buttonClick.bind(this)} value = {4} type = 'button'>✦</button>
					<button className = {this.state.numGreen > 4?'btn btn-success':'btn'} onClick = {this.buttonClick.bind(this)} value = {5} type = 'button'>✦</button>
				</div>
			</form>
			</div>	
		);
	
	}
		buttonClick (event){
			var score = event.target.value	//When you click a button, it sets numGreen to that value
			this.setState({numGreen:score})
			axios.post('/review',{restaurant: this.props.restaurant_info.restaurant_id, airport: this.props.restaurant_info.airport_id, score: score, airportName: this.props.airportName})
				.then((response)=>{
				 	this.props.fetchRestaurants(response)	//it then posts the review to Axios and then makes a new restaurant list with the added review.
				 											//I chose to do it like this so that all reviews that have been made since you last last updated the
				})											//restaurant list will come through, keeping the app up to date.
		}
}
//Basic Redux setup.
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchRestaurants},dispatch)
}
function mapStateToProps(state){
  return {restaurants : state.restaurants,airportName : state.airportName}
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
