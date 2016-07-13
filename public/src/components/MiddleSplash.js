import React, {Component} from 'react';
import axios from 'axios';
import SearchBar from './searchBar';	
import RestaurantList from './RestaurantList';

class MiddleSplash extends Component {
	constructor(props){
		super(props)

	}
	
	render(){
		let restList;
		if(this.props.restaurantInfo){
			restList = (
				this.props.restaurantInfo.data.map(function(rest){
					return (
						<div>
							<h6>{rest.NAME}</h6>
							<p>Near gate(s): {rest.NEAR_GATE}</p>
							<p>{rest.TYPE}</p>
						</div>
						)
					
					}
				)				
			) // end restList
		
		}

		return(
			<div>{ restList }

			</div>
		);
	} // end render

} // end class

export default MiddleSplash;

		//	<div className = 'restaurantList'>
		//if(this.props.restaurantInfo)

		//	{this.props.restaurantInfo.data.map((rest) => {
		//		return <div className = "restaurant">
		//				<h3>{rest.name}</h3>
		//				</div>
		//	})}
		
		//	</div>

//  render(){

//     return (
//       <div className='pet-shop'>
//         <h1> {"Welcome to "  + this.state.shop.name}</h1>
//         { this.state.pets.map((pet, index) => {

//           if (this.props.user) {
//             var hasLiked = (pet.likes.indexOf(this.props.user.id) >= 0)
//           }

//           return <div key={index} className='pet'>
//             <h3> {pet.name + " the " + pet.species}</h3>
//             <img src={pet.imageUrl} />
//             <label> {pet.likes.length + " votes" } </label>

//             { this.props.user && ! hasLiked
//               ? <button onClick={() => { this.handleLikePet(pet.id) }}> "Like this pet!" </button>
//               : null
//             }
//           </div>
//         })}
//       </div>
//     );
//       }
// }