import React, { Component } from 'react';
import LogInOut from './LogInOut'


export default class EachRestaurant extends Component {
  render() {
  	console.log(this.props.restaurant_info)
    return (
      <div className = 'each'>
							<p>{this.props.restaurant_info.NAME}</p>
							<p>Terminal: {this.props.restaurant_info.TERMINAL}</p>
							<p>Near gate(s): {this.props.restaurant_info.NEAR_GATE}</p>
							<p>Hours: {this.props.restaurant_info.OPEN} - {this.props.restaurant_info.CLOSE}</p>
							<p>Type: {this.props.restaurant_info.TYPE}</p>
							<p>Speed: {this.props.restaurant_info.SPEED}</p>
							<p>Price: {this.props.restaurant_info.PRICE}</p>

      </div>

    );
  }
}