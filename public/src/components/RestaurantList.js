import React, {Component} from 'react';
import axios from 'axios';
import MiddleSplash from './MiddleSplash';


class RestaurantList extends Component {
	constructor(props){
		super(props)

		this.state = { term: ''} ;
	}
	render(){

		let restList;
		if(this.props.restaurantInfo){
			restList = (
				this.props.restaurantInfo.data.map(function(rest){
					return(
						<div className = 'each'>
							<p>{rest.NAME}</p>
							<p>Terminal: {rest.TERMINAL}</p>
							<p>Near gate(s): {rest.NEAR_GATE}</p>
							<p>Hours: {rest.OPEN} - {rest.CLOSE}</p>
							<p>Type: {rest.TYPE}</p>
							<p>Speed: {rest.SPEED}</p>
							<p>Price: {rest.PRICE}</p>
						</div>
						)
					
					}
				)				
			) // end restList
		
		}

		return(

			<div>
			{restList}
			</div>
			
		);
	}

}

export default RestaurantList;