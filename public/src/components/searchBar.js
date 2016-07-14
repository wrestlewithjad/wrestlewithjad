import React, {Component} from 'react';
import axios from 'axios';
import MiddleSplash from './MiddleSplash';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import RestaurantList from './RestaurantList';
import {fetchAirport} from '../actions/actions';
import {fetchRestaurants} from '../actions/actions';

class SearchBar extends Component {
	constructor(props){
		super(props)

		this.state = { 
			term: ''
		} ;
	}
	render(){
		return(
			<div className = 'search-bar'>
			<form className='search-bar' 
			onSubmit = {this.onSearch.bind(this)}>
				<input
					value = {this.state.term}
					placeholder = 'SEARCH!'
					onChange = {event => this.onInputChange(event.target.value)}
					/>
			</form>
			</div>
		);
	}

	onInputChange(term){
		this.setState({term});
	}



	onSearch(event){
		event.preventDefault();
		this.props.fetchAirport(this.state.term)
			axios.get('/restaurantList',{params:{city: this.state.term}}).then((value)=> {
				console.log('VALUE',value)
    			this.props.fetchRestaurants(value)
    			//console.log("RES",this.state.restaurants)
    					})

	}

	// componentDidMount() {
 //    	axios.get('/restaurantList').then( value =>{
 //    		console.log('restaurantList', value)
 //    	})
 //    }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchAirport,fetchRestaurants},dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)
//export default SearchBar;


//compare users input to db with airport city
//if city exists pop up the restaurants
//if not say "airport coming sooooon"