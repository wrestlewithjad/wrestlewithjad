import React, {Component} from 'react';
import axios from 'axios';

class SearchBar extends Component {
	constructor(props){
		super(props)

		this.state = { terms: ''} ;
	}
	render(){
		return(
			<div className = 'search-bar'>
			<form className='search-bar'>
				<input
					value = {this.state.term}
					placeholder = 'SEARCH!'
					onChange = {event => this.onInputChange(event.target.value)}
					onSubmit = {event => 
						event.preventDefault()
					}/>
					{console.log(this.state.term)}

			</form>
			</div>
		);
	}

	onInputChange(term){
		this.setState({term});
	}

	componentDidMount() {
    	axios.get('/restaurantList').then( value =>{
    		console.log('restaurantList', value)
    	})
    }
}

export default SearchBar;

//take searchterm compare it to our db of airports
//if valid re-render the page with all our goodies
//if not throw error or "oops we dont have that one!"
//use fetch to call the server 