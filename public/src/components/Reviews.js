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

	}

	render(){
		console.log('props',this.props.restaurant_info)
		//{console.log('DID THIS WORRRRRRK DID IT??', this.props.restaurant_info)}


		var stars = (
			<form method ="get">
				<div>
					<button className = {this.state.numGreen > 0?'btn btn-success':'btn'} onClick = {this.buttonClick.bind(this)} value = {1} type = 'button'>✦</button>
					<button className = {this.state.numGreen > 1?'btn btn-success':'btn'} onClick = {this.buttonClick.bind(this)} value = {2} type = 'button'>✦</button>
					<button className = {this.state.numGreen > 2?'btn btn-success':'btn'} onClick = {this.buttonClick.bind(this)} value = {3} type = 'button'>✦</button>
					<button className = {this.state.numGreen > 3?'btn btn-success':'btn'} onClick = {this.buttonClick.bind(this)} value = {4} type = 'button'>✦</button>
					<button className = {this.state.numGreen > 4?'btn btn-success':'btn'} onClick = {this.buttonClick.bind(this)} value = {5} type = 'button'>✦</button>
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
			this.setState({numGreen:score})
			console.log(this.props.restaurants)
			axios.post('/review',{restaurant: this.props.restaurant_info.restaurant_id, airport: this.props.restaurant_info.airport_id, score: score, airportName: this.props.airportName})
				.then((response)=>{
					// console.log("RESPONSE",response);
					// console.log("INGO",this.props.restaurant_info)
					// var newRestaurantInfo = {};
					// for(var key in this.props.restaurant_info){
					// 	newRestaurantInfo[key]=this.props.restaurant_info[key]
					// }
					//newRestaurantInfo[response]
					//this.props.fetchRestaurants()
				// 	axios.post('/review',{restaurant: this.props.restaurant_info.restaurant_id, airport: this.props.restaurant_info.airport_id, score: score})
				// .then((response)=>{
				 	this.props.fetchRestaurants(response)
				// })

				})
		}
		makeGreen(score){
			for(var i=1;i<=score;i++){
				var greenButton = 'button'+i
				this.setState({[greenButton]:'btn btn-success'})
				//console.log("heer",this.state.button1)
			}
			console.log("SCORE",score)
			for(var j = Number(score)+1 ;j<=5; j++){
				var greenButton = 'button'+j
				console.log("gb",greenButton)
				this.setState({[greenButton]:'btn'})
			}
		}
		
}


//export default Reviews
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchRestaurants},dispatch)
}
function mapStateToProps(state){
  return {restaurants : state.restaurants,airportName : state.airportName}
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)

//resturant id
//airport id
//score

//things need to do.
//click the button and retrieve that restaurants data. 
//depending on what button it is send a value of 1-5
//post request to /review. 
