import React, {Component} from 'react';
import axios from 'axios';
import RestaurantList from './RestaurantList'



class Reviews extends Component {
	constructor(props){
		super(props)

	}

	render(){

		{console.log('DID THIS WORRRRRRK', this.props.scores)}


		var stars = (
			<div>
				<button>✦</button>
				<button>✦</button>
				<button>✦</button>
				<button>✦</button>
				<button>✦</button>
			</div>
		)

		return(
			<div>
				{true 
					? stars	
					: null}
			</div>	
		);
	
	}
		
}

export default Reviews

