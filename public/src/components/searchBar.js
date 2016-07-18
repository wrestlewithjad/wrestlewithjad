import React, {Component} from 'react';
import axios from 'axios';
import MiddleSplash from './MiddleSplash';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import RestaurantList from './RestaurantList';
import {fetchAirport} from '../actions/actions';
import {fetchRestaurants, fetchFilter} from '../actions/actions';


class SearchBar extends Component {
	constructor(props){
		super(props)

		this.state = { 
			term: '',
			searchBar: 'search-bar'
		} ;
	}
	render(){
		return(
			<div className = {this.state.searchBar}>
			<form className={this.state.searchBar}
			onSubmit = {this.onSearch.bind(this)}>
				<input
					value = {this.state.term.toLowerCase()}
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
    			this.setState({term:""})
    			if(value.data){
    				this.props.fetchFilter({speed: 'Any',terminals:'Any',price:"Any",types:'Any',map:false})
    				this.setState({searchBar:'search-bar-2'})
    			}
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
  return bindActionCreators({fetchAirport,fetchRestaurants,fetchFilter},dispatch)
}


export default connect(null, mapDispatchToProps)(SearchBar)
//export default SearchBar;


//compare users input to db with airport city
//if city exists pop up the restaurants
//if not say "airport coming sooooon"