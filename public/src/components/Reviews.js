import React, {Component} from 'react';
import axios from 'axios';
import LogInOut from './LogInOut'


class Reviews extends Component {
	constructor(props){
		super(props)

	}

	render(){


		console.log('from reviews', this.props.loggedIn)

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
				{!this.props.loggedIn 
					? stars	
					: null}
			</div>	
		);
	
	}
		
}

export default Reviews

