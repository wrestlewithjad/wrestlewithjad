import React, {Component} from 'react';
import axios from 'axios';
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
	onInputChange(term){		//basic way to have a search bar work with React
		this.setState({term});
	}
	onSearch(event){
		event.preventDefault();
		this.props.fetchAirport(this.state.term)  //Set the airport up in Redux
			axios.get('/restaurantList',{params:{city: this.state.term}}).then((value)=> {  //Grab the restaurants
    			this.props.fetchRestaurants(value)  //set the restaurants in Redux
    			this.setState({term:""})		//Clear out the search bar
    			if(value.data){	//if your search for restaurants returned something
    				this.props.fetchFilter({speed: 'Any',terminals:'Any',price:"Any",types:'Any',map:false}) //reset the filters
    				this.setState({searchBar:'search-bar-2'})	//change the search bar to the 2nd style so it's not in the way anymore.
    			}
    					})

	}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchAirport,fetchRestaurants,fetchFilter},dispatch)
}


export default connect(null, mapDispatchToProps)(SearchBar)  //This doesn't need stateToProps so we just attach mapDispatch
