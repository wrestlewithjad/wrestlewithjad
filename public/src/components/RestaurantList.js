import React, {Component} from 'react';
import axios from 'axios';
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
	//Let's move these to the css page shall we?
		var listStyle = {
			listStyleType: 'none',
		}
		var revStyle = {
			float: 'right'
		}
		var showList;

		if(this.props.restaurants.data){  //If you have restaurant data,make a variable that has a bunch of React classes in it, each being a specific restaurant
			//Only grab the ones that meet the filter criteria
				showList = this.props.restaurants.data[0].map(restaurant=>{
					return (this.isTrue(restaurant)?<li style={listStyle} key = {restaurant.restaurant_id}><EachRestaurant restaurant_info = {restaurant} /> </li>:null)
				})	
		}
		//Display the restaurants or null, depending on if the restaruants list is populated in Redux
		return(
			<ul className = "Restaurants">
			{this.props.restaurants.data ? showList : null}
			</ul>
		);
	}
		isTrue(restaurant){	//This is just checking the filter.
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
		return isTrue;
	}

}

//basic redux.
function mapStateToProps(state){
  return {airportName : state.airportName, restaurants: state.restaurants,filter:state.filters}
}

export default connect(mapStateToProps)(RestaurantList)