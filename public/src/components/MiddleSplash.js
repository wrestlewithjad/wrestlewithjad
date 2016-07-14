import React, {Component} from 'react';
import axios from 'axios';
import SearchBar from './searchBar';	
import RestaurantList from './RestaurantList';

class MiddleSplash extends Component {
	constructor(props){
		super(props)

	}
	
	render(){
		

		return(
			<div>
			<RestaurantList />
			</div>
		);
	} // end render

} // end class

export default MiddleSplash;

		