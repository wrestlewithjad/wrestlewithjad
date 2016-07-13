import React, {Component} from 'react';
import axios from 'axios';
import MiddleSplash from './MiddleSplash';
import RestaurantList from './RestaurantList';

class SearchBar extends Component {
	constructor(props){
		super(props)

		this.state = { 
			term: '',
			restaurantInfo: null
		} ;
	}
	render(){
		var this2 = this;
		return(
			<div className = 'search-bar'>
			<form className='search-bar' 
			onSubmit = {function(event){ 
						event.preventDefault()
						axios.get('/restaurantList').then(function(value) {
    					console.log('RESTTTTSARANTS', value)
    					{this2.onInputChange2(value)};
    					})
					}
					}>
				<input
					value = {this.state.term}
					placeholder = 'SEARCH!'
					onChange = {event => this.onInputChange(event.target.value)}
					/>
					{console.log('from searchbar', this.state.term)}

			</form>

			<RestaurantList restaurantInfo = {this.state.listInfo}/>
			</div>
		);
	}

	onInputChange(term){
		this.setState({term});
	}

	onInputChange2(listInfo){
		this.setState({listInfo});
	}

	// componentDidMount() {
 //    	axios.get('/restaurantList').then( value =>{
 //    		console.log('restaurantList', value)
 //    	})
 //    }
}

export default SearchBar;


//compare users input to db with airport city
//if city exists pop up the restaurants
//if not say "airport coming sooooon"