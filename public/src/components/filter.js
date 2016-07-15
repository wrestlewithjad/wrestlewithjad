import React, {Component} from 'react';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import {fetchFilter} from '../actions/actions';

 class Filter extends Component{
	constructor(props){
    super(props)
    this.state={speed: 'Any',terminals:'Any',price:"Any",types:'Any'}
    this.props.fetchFilter(this.state)
    }
    //this.state = {restaurants: this.props.restaurants}
  

	render(){
		//this.grabTerminals()
		return(	<div>{this.props.restaurants.data?<form>
			Terminal: <ul>
			 <li className ='filter'><input type='radio' name = 'terminal' value = 'Any' checked = {this.state.terminals ==='Any'} onChange={this.handleTerminalChange.bind(this)}/>All </li>
			 {( this.props.restaurants.data.map(restaurant=>{
				return restaurant.TERMINAL
				}).filter(function(item,index,array){return array.indexOf(item)===index}).map(terminals =>{
					return <li className ='filter' key = {terminals}><input type='radio' name = 'terminal' value = {terminals} checked = {this.state.terminals ===terminals} onChange={this.handleTerminalChange.bind(this)}/>{terminals}</li>
				})
			)}
			</ul>
			Price:
			<ul>
			<li className ='filter'><input type='radio' name = 'price' value = '$' checked = {this.state.price ==='$'} onChange={this.handlePriceChange.bind(this)}/>$</li>
			<li className ='filter'><input type='radio' name = 'price' value = '$$' checked = {this.state.price ==='$$'} onChange={this.handlePriceChange.bind(this)}/>$$  </li>
			<li className ='filter'><input type='radio' name = 'price' value = '$$$' checked = {this.state.price ==='$$$'} onChange={this.handlePriceChange.bind(this)}/>$$$</li>
			<li className ='filter'><input type='radio' name = 'price' value = '$$$$' checked = {this.state.price ==='$$$$'} onChange={this.handlePriceChange.bind(this)}/>$$$$  </li>
			<li className ='filter'><input type='radio' name = 'price' value = 'Any' checked = {this.state.price ==='Any'} onChange={this.handlePriceChange.bind(this)}/>All</li>
			</ul>
			Speed:
			<ul>
			<li className ='filter'><input type='radio' name = 'speed' value = 'To-go' checked = {this.state.speed ==='To-go'} onChange={this.handleOptionChange.bind(this)}/>Grab and Go</li>
			<li className ='filter'><input type='radio' name = 'speed' value = 'Food court' checked = {this.state.speed ==='Food court'} onChange={this.handleOptionChange.bind(this)}/>Food Court  </li>
			<li className ='filter'><input type='radio' name = 'speed' value = 'Sit-down' checked = {this.state.speed ==='Sit-down'} onChange={this.handleOptionChange.bind(this)}/>Sit Down </li>
			<li className ='filter'><input type='radio' name = 'speed' value = 'Any' checked = {this.state.speed ==='Any'} onChange={this.handleOptionChange.bind(this)}/>All</li>
			</ul>
			Type:  <ul>
			 <li className ='filter'><input type='radio' name = 'type' value = 'Any' checked = {this.state.types ==='Any'} onChange={this.handleTypeChange.bind(this)}/>All</li>
			 {this.props.restaurants.data.map(restaurant=>{
				return restaurant.TYPE
				}).filter(function(item,index,array){ 
				 return array.indexOf(item)===index}).map(types =>{
					return <li className ='filter' key = {types}><input type='radio' name = 'type' value = {types} checked = {this.state.types ===types} onChange={this.handleTypeChange.bind(this)}/>{types}</li>
				})}
			</ul>
			</form>: null}
			</div>
			)
	}

	handleOptionChange(event){

		this.setState({speed:event.target.value},function(){
			this.props.fetchFilter(this.state)
		})
		

	}
	handleTypeChange(event){
		this.setState({types:event.target.value},function(){
			this.props.fetchFilter(this.state)
		})
		
	}
	handlePriceChange(event){
		this.setState({price:event.target.value},function(){
			this.props.fetchFilter(this.state)
		})
		
	}
	handleTerminalChange(event){
		//console.log("WHAT",event.target.value)
		this.setState({terminals:event.target.value},function(){
			this.props.fetchFilter(this.state)	
		})
		
	}
	grabFilters(event){
		event.preventDefault();
		//console.log("now here",event)

	}
	grabTerminals(){
		//console.log("HEY NOW",this.props.restaurants)
		var restaurantSet = new Set();
		if(this.props.restaurants.data){
		var terminals = this.props.restaurants.data.map((restaurant)=>{
			restaurantSet.add(restaurant.TERMINAL)
			return restaurant.TERMINAL
		})
   		//console.log("SET",restaurantSet)
   		this.setState({terminals:restaurantSet})
			
		}
		else{
			console.log("nothing here")
		}
		//console.log("TERMINALS",terminals)
	}
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchFilter},dispatch)
}
function mapStateToProps(state){
  return {restaurants : state.restaurants}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)