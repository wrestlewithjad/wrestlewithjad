import React, {Component} from 'react';
import axios from 'axios';
import MiddleSplash from './MiddleSplash';
import EachRestaurant from './eachRestaurant';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';

class RestaurantList extends Component {
	constructor(props){
		super(props)

		this.state = { restaurants: []} ;
	}
	render(){
		//{this.grabRestaurants(this.props.airportName)}
		{console.log("BAM",this.props.restaurants)}
		let restList;
		// if(this.props.restaurantInfo.data){
		// 	restList = (
		// 		this.props.restaurantInfo.data.map(function(rest){
		// 			return(
		// 				<div className = 'each'>
		// 					<p>{rest.NAME}</p>
		// 					<p>Terminal: {rest.TERMINAL}</p>
		// 					<p>Near gate(s): {rest.NEAR_GATE}</p>
		// 					<p>Hours: {rest.OPEN} - {rest.CLOSE}</p>
		// 					<p>Type: {rest.TYPE}</p>
		// 					<p>Speed: {rest.SPEED}</p>
		// 					<p>Price: {rest.PRICE}</p>
		// 				</div>
		// 				)
					
		// 			}
		// 		)				
		// 	) // end restList
		
		// }

		return(

			<div>
			hellos

			<ul>
			{this.props.restaurants.data ? this.props.restaurants.data.map(restaurant=>{
				return <ul key = {restaurant.restaurant_id}><EachRestaurant restaurant_info = {restaurant} /> </ul>
			}):null}
			</ul>

			</div>
			
		);
	}

}


function mapStateToProps(state){
  return {airportName : state.airportName, restaurants: state.restaurants}
}

export default connect(mapStateToProps)(RestaurantList)