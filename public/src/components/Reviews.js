import React, {Component} from 'react';
import axios from 'axios';
import RestaurantList from './RestaurantList'



class Reviews extends Component {
	constructor(props){
		super(props)

	}

	render(){

		{console.log('DID THIS WORRRRRRK DID IT??', this.props.restaurant_info)}


		var stars = (
			<form method ="get">
				<div>
					<button className = 'btn' onClick = {this.buttonClick} value = {['1',this.props.restaurant_info.restaurant_id, this.props.restaurant_info.airport_id]} type = 'button'>✦</button>
					<button className = 'btn' onClick = {this.buttonClick} value = {['2',this.props.restaurant_info.restaurant_id, this.props.restaurant_info.airport_id]} type = 'button'>✦</button>
					<button className = 'btn' onClick = {this.buttonClick} value = {['3',this.props.restaurant_info.restaurant_id, this.props.restaurant_info.airport_id]} type = 'button'>✦</button>
					<button className = 'btn' onClick = {this.buttonClick} value = {['4',this.props.restaurant_info.restaurant_id, this.props.restaurant_info.airport_id]} type = 'button'>✦</button>
					<button className = 'btn' onClick = {this.buttonClick} value = {['5',this.props.restaurant_info.restaurant_id, this.props.restaurant_info.airport_id]} type = 'button'>✦</button>
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
			var y = event.target.value
			console.log({restaurant: y[2], airport: y[4], score: y[0]})
			axios.post('/review',{restaurant: y[2], airport: y[4], score: y[0]})
				.then(function(response){
					console.log('response', response)
					console.log('REVIEWED!')
				})
		}
		
}


export default Reviews

//resturant id
//airport id
//score

//things need to do.
//click the button and retrieve that restaurants data. 
//depending on what button it is send a value of 1-5
//post request to /review. 
