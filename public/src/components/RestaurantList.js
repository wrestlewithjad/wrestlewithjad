import React, {Component} from 'react';
import axios from 'axios';
import MiddleSplash from './MiddleSplash';


class RestaurantList extends Component {
	constructor(props){
		super(props)

		this.state = { term: ''} ;
	}
	render(){

		return(

			<div>
				<h6>{rest.NAME}</h6>
				<p>Near gate(s): {rest.NEAR_GATE}</p>
				<p>{rest.TYPE}</p>
			</div>
			
		);
	}

}

export default RestaurantList;