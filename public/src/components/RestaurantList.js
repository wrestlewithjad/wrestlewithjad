import React, {Component} from 'react';
import axios from 'axios';
import MiddleSplash from './MiddleSplash';
import EachRestaurant from './eachRestaurant';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import Reviews from './Reviews';


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

		var style = {
			listStyleType: 'none'
		}

		var revStyle = {
			float: 'right'
		}

		var showList;



		if(this.props.restaurants.data){
			if(this.props.restaurants.data.length > 3){
				showList = this.props.restaurants.data.map(restaurant=>{
					return <li style={style} key = {restaurant.restaurant_id}><EachRestaurant restaurant_info = {restaurant} /> </li>
				})
			} else {
				{console.log('******************', this.props.restaurants.data[1])}


				showList = this.props.restaurants.data[0].map(restaurant=>{
				return <div><li style={style} key = {restaurant.restaurant_id}><EachRestaurant restaurant_info = {restaurant} /><Reviews /></li>
						</div>
			})
			}
		}
		
		return(

			<div>
			hellos

			<ul>
			{this.props.restaurants.data ? showList : null}
			</ul>

			</div>
			
		);
	}

}


function mapStateToProps(state){
  return {airportName : state.airportName, restaurants: state.restaurants}
}

export default connect(mapStateToProps)(RestaurantList)