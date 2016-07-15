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

		let restList;
		console.log("PROPS",this.props.filter)

		var style = {
			listStyleType: 'none'
		}

		var revStyle = {
			float: 'right'
		}

		var showList;



		if(this.props.restaurants.data){
			console.log("DATA",this.props.restaurants.data)
			if(this.props.restaurants.data.length > 3){
				showList = this.props.restaurants.data.map(restaurant=>{
					return (this.isTrue(restaurant)?<li style={style} key = {restaurant.restaurant_id}><EachRestaurant restaurant_info = {restaurant} /> </li>:null)
				})
			} else {
				{console.log('******************', this.props.restaurants.data[1])}


				showList = this.props.restaurants.data[0].map(restaurant=>{
				return (this.isTrue(restaurant)?<div><li style={style} key = {restaurant.restaurant_id}><EachRestaurant restaurant_info = {restaurant} /><Reviews /></li>
						</div>:null)
			})
			}
		}
		
		return(

			<div className = "RestaurantList">
			<ul>
			{this.props.restaurants.data ? showList : null}
			</ul>

			</div>
			
		);


	}
		isTrue(restaurant){
		var isTrue = true;
		//console.log("RESTAURANT",restaurant)
		//console.log('PROPSS',this.props.filter)
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