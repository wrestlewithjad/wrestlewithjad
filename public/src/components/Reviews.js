import React, {Component} from 'react';
import axios from 'axios';
import RestaurantList from './RestaurantList'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import {fetchRestaurants} from '../actions/actions';


class Reviews extends Component {
	constructor(props){
		super(props)

	}

	render(){

		{console.log('DID THIS WORRRRRRK DID IT??', this.props.restaurant_info)}


		var stars = (
			<form method ="get">
				<div>
					<button className = 'btn' onClick = {this.buttonClick.bind(this)} value = {1} type = 'button'>✦</button>
					<button className = 'btn' onClick = {this.buttonClick.bind(this)} value = {2} type = 'button'>✦</button>
					<button className = 'btn' onClick = {this.buttonClick.bind(this)} value = {3} type = 'button'>✦</button>
					<button className = 'btn' onClick = {this.buttonClick.bind(this)} value = {4} type = 'button'>✦</button>
					<button className = 'btn' onClick = {this.buttonClick.bind(this)} value = {5} type = 'button'>✦</button>
				</div>
			</form>
		)

		return(
			<div>
				{true 
					? stars	
					: null}
			</div>	
		);
	
	}
		buttonClick (event){
			var score = event.target.value


			axios.post('/review',{restaurant: this.props.restaurant_info.restaurant_id, airport: this.props.restaurant_info.airport_id, score: score})
				.then((response)=>{
					this.props.fetchRestaurants(response)

				})
		}
		
}


//export default Reviews
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchRestaurants},dispatch)
}
function mapStateToProps(state){
  return {restaurants : state.restaurants}
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)

//resturant id
//airport id
//score

//things need to do.
//click the button and retrieve that restaurants data. 
//depending on what button it is send a value of 1-5
//post request to /review. 
