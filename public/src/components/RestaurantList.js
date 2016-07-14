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
		//{console.log("BAM",this.props.restaurants)}
		let restList;
		console.log("PROPS",this.props.filter)
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
		var style = {listStyleType:'none'}
		return(

			<div>
			<ul style = {style}>
			{this.props.restaurants.data ? this.props.restaurants.data.map(restaurant=>{
				if( !this.props.filter.terminals || this.isTrue(restaurant)){
				return <li key = {restaurant.restaurant_id}><EachRestaurant restaurant_info = {restaurant} /> </li>
					}
				else{

				}
			}):null}
			</ul>

			</div>
			
		);


	}
		isTrue(restaurant){
		var isTrue = true;

		if((this.props.filter.terminals!==restaurant.TERMINAL)&&(this.props.filter.terminals!=='Any')){
			isTrue = false
		}
		if((this.props.filter.speed!==restaurant.SPEED)&&(this.props.filter.speed!=='Any')){
			isTrue = false
		}
		if((this.props.filter.price!==restaurant.PRICE)&&(this.props.filter.price!=='Any')){
			isTrue = false
		}
		if((this.props.filter.types!==restaurant.TYPE)&&(this.props.filter.types!=='Any')){
			isTrue = false
		}
		console.log("ISTRUE",isTrue)
		return isTrue;
	}

}


function mapStateToProps(state){
  return {airportName : state.airportName, restaurants: state.restaurants,filter:state.filters}
}

export default connect(mapStateToProps)(RestaurantList)