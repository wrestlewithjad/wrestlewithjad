import React, {Component} from 'react';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import {fetchFilter} from '../actions/actions';

 class Filter extends Component{
	constructor(props){
    super(props)
    this.state={speed: 'Any',terminals:'Any',price:"Any",types:'Any',map:false}  //by default, filter should go to Any
    }
	render(){
		var fixed = {	//We had different people work on CSS and sometimes they didn't use our style sheet.
   			
   			lineHeight: '50%'
		}

		var radioStyle = {
			display: 'inline',
			float: 'left',
			fontSize: '90%'
		}
		var restaurantList;
		if(this.props.restaurants.data){
				restaurantList = this.props.restaurants.data[0];	//This is grabbing all the data from the restaurants.
		}
		//comments are annoying in return statements.  So what this does is make a radio button filter.  The terminal and restaurants are dynamically created with the restaurant terminal data.
		return(	<div style ={fixed} className = 'theFilter'>
			{restaurantList?<form>
				<h5>Filter</h5>
			<div style={radioStyle}><br/>Terminal:
			 <li className ='filter'><input type='radio' name = 'terminal' value = 'Any' checked = {this.props.filters.terminals =='Any'} onChange={this.handleTerminalChange.bind(this)}/> All </li>
			 {( restaurantList.map(restaurant=>{
				return restaurant.TERMINAL
				}).filter(function(item,index,array){return array.indexOf(item)===index}).map(terminals =>{
					return <li className ='filter' key = {terminals}><input type='radio' name = 'terminal' value = {terminals} checked = {this.props.filters.terminals ===terminals} onChange={this.handleTerminalChange.bind(this)}/> {terminals}</li>
				})
			)}
			</div>
			
			
			<div style={radioStyle}>
			<br/>Price:
			<li className ='filter'><input type='radio' name = 'price' value = '$' checked = {this.state.price ==='$'} onChange={this.handlePriceChange.bind(this)}/> $</li>
			<li className ='filter'><input type='radio' name = 'price' value = '$$' checked = {this.state.price ==='$$'} onChange={this.handlePriceChange.bind(this)}/> $$  </li>
			<li className ='filter'><input type='radio' name = 'price' value = '$$$' checked = {this.state.price ==='$$$'} onChange={this.handlePriceChange.bind(this)}/> $$$</li>
			<li className ='filter'><input type='radio' name = 'price' value = '$$$$' checked = {this.state.price ==='$$$$'} onChange={this.handlePriceChange.bind(this)}/> $$$$  </li>
			<li className ='filter'><input type='radio' name = 'price' value = 'Any' checked = {this.state.price ==='Any'|| this.props.filters != this.state} onChange={this.handlePriceChange.bind(this)}/> All</li>
			</div>

			<div style={radioStyle}>
			<br/>Speed:
			<li className ='filter'><input type='radio' name = 'speed' value = 'To-go' checked = {this.state.speed ==='To-go'} onChange={this.handleOptionChange.bind(this)}/> Grab & Go</li>
			<li className ='filter'><input type='radio' name = 'speed' value = 'Food court' checked = {this.state.speed ==='Food court'} onChange={this.handleOptionChange.bind(this)}/> Food Court  </li>
			<li className ='filter'><input type='radio' name = 'speed' value = 'Sit-down' checked = {this.state.speed ==='Sit-down'} onChange={this.handleOptionChange.bind(this)}/> Sit Down </li>
			<li className ='filter'><input type='radio' name = 'speed' value = 'Any' checked = {this.state.speed ==='Any'|| this.props.filters != this.state} onChange={this.handleOptionChange.bind(this)}/> All</li>
			</div>

			<div style={radioStyle}>
			<br/><br/>Type:<br/><br/>
			 <li className ='filter'><input type='radio' name = 'type' value = 'Any' checked = {this.props.filters.types ==='Any'} onChange={this.handleTypeChange.bind(this)}/> All</li>
			 {restaurantList.map(restaurant=>{
				return restaurant.TYPE
				}).filter(function(item,index,array){ 
				 return array.indexOf(item)===index}).map(types =>{
					return <li className ='filter' key = {types}><input type='radio' name = 'type' value = {types} checked = {this.props.filters.types === types} onChange={this.handleTypeChange.bind(this)}/> {types}</li>
				})}
				<br/><br/><br/>	
			</div>
			<div><img className = 'mapImage' src={this.props.filters != this.state ? this.props.restaurants.data[1][0].map :(this.state.maps || this.props.restaurants.data[1][0].map)} /></div>
			</form>: null}

			</div>
			)
	}
//These functions are for when you click on any of the filters.  You set the state AND THEN you update the Redux filter object
//There is a bug here where if you change cities, everything gets set to All, except the state doesn't actually change.  This means that it will send the
//old state info as soon as you change the filter again as this grabs the state.  
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
	handleTerminalChange(event){		//This one is slightly longer because it's also grabbing the map.
		this.setState({terminals:event.target.value},function(){
			for(var i = 0;i<this.props.restaurants.data[1].length;i++){
				if(this.props.restaurants.data[1][i].terminal===this.state.terminals){
					this.setState({maps:this.props.restaurants.data[1][i].map},function(){
						this.props.fetchFilter(this.state)
					})
				}
			}		
		})
		
	}
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchFilter},dispatch)
}
function mapStateToProps(state){
  return {restaurants : state.restaurants, filters:state.filters}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)