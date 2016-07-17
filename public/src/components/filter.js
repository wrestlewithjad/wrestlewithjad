import React, {Component} from 'react';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import {fetchFilter} from '../actions/actions';

 class Filter extends Component{
	constructor(props){
    super(props)
    this.state={speed: 'Any',terminals:'Any',price:"Any",types:'Any',map:false}
    this.props.fetchFilter(this.state)
    }
    //this.state = {restaurants: this.props.restaurants}
  

	render(){
		//this.grabTerminals()


		var map;
		if( this.state.terminals === 'A') {
			map = 'https://s32.postimg.org/4x7yp1gxh/iah_terminal_a_360_wl.png'
		} else if ( this.state.terminals === 'B') {
			map = 'https://s31.postimg.org/8ocobu87v/iah_terminal_b_360_wl.png'
		} else if ( this.state.terminals === 'C') {
			map = 'https://s31.postimg.org/f3c5s2bcr/iah_terminal_c_360_wl.png'
		} else if ( this.state.terminals === 'D') {
			map = 'https://s32.postimg.org/v6wvh93vp/iah_terminal_d_360_wl.png'
		} else if (this.state.terminals === 'E') {
			map = 'https://s31.postimg.org/y2iazclwb/iah_terminal_e_360_wl.png'
		} else {
			map = 'https://s32.postimg.org/jhxypmr3p/iah_airport_360_wl.png'
		}

		var fixed = {
   			
   			lineHeight: '50%'
		}

		var radioStyle = {
			display: 'inline',
			float: 'left',
			fontSize: '90%'
		}

		var imageSize = {
			width: '300px',
		}


		var restaurantList;
		if(this.props.restaurants.data){
				restaurantList = this.props.restaurants.data[0];
		}

		return(	<div style ={fixed} className = 'theFilter'>
			{restaurantList?<form>
				<h5>Filter</h5>
			<div style={radioStyle}><br/>Terminal:
			 <li className ='filter'><input type='radio' name = 'terminal' value = 'Any' checked = {this.state.terminals ==='Any'} onChange={this.handleTerminalChange.bind(this)}/> All </li>
			 {( restaurantList.map(restaurant=>{
				return restaurant.TERMINAL
				}).filter(function(item,index,array){return array.indexOf(item)===index}).map(terminals =>{
					return <li className ='filter' key = {terminals}><input type='radio' name = 'terminal' value = {terminals} checked = {this.state.terminals ===terminals} onChange={this.handleTerminalChange.bind(this)}/> {terminals}</li>
				})
			)}
			</div>
			
			
			<div style={radioStyle}>
			<br/>Price:
			<li className ='filter'><input type='radio' name = 'price' value = '$' checked = {this.state.price ==='$'} onChange={this.handlePriceChange.bind(this)}/> $</li>
			<li className ='filter'><input type='radio' name = 'price' value = '$$' checked = {this.state.price ==='$$'} onChange={this.handlePriceChange.bind(this)}/> $$  </li>
			<li className ='filter'><input type='radio' name = 'price' value = '$$$' checked = {this.state.price ==='$$$'} onChange={this.handlePriceChange.bind(this)}/> $$$</li>
			<li className ='filter'><input type='radio' name = 'price' value = '$$$$' checked = {this.state.price ==='$$$$'} onChange={this.handlePriceChange.bind(this)}/> $$$$  </li>
			<li className ='filter'><input type='radio' name = 'price' value = 'Any' checked = {this.state.price ==='Any'} onChange={this.handlePriceChange.bind(this)}/> All</li>
			</div>

			<div style={radioStyle}>
			<br/>Speed:
			<li className ='filter'><input type='radio' name = 'speed' value = 'To-go' checked = {this.state.speed ==='To-go'} onChange={this.handleOptionChange.bind(this)}/> Grab & Go</li>
			<li className ='filter'><input type='radio' name = 'speed' value = 'Food court' checked = {this.state.speed ==='Food court'} onChange={this.handleOptionChange.bind(this)}/> Food Court  </li>
			<li className ='filter'><input type='radio' name = 'speed' value = 'Sit-down' checked = {this.state.speed ==='Sit-down'} onChange={this.handleOptionChange.bind(this)}/> Sit Down </li>
			<li className ='filter'><input type='radio' name = 'speed' value = 'Any' checked = {this.state.speed ==='Any'} onChange={this.handleOptionChange.bind(this)}/> All</li>
			</div>

			<div style={radioStyle}>
			<br/><br/>Type:<br/><br/>
			 <li className ='filter'><input type='radio' name = 'type' value = 'Any' checked = {this.state.types ==='Any'} onChange={this.handleTypeChange.bind(this)}/> All</li>
			 {restaurantList.map(restaurant=>{
				return restaurant.TYPE
				}).filter(function(item,index,array){ 
				 return array.indexOf(item)===index}).map(types =>{
					return <li className ='filter' key = {types}><input type='radio' name = 'type' value = {types} checked = {this.state.types ===types} onChange={this.handleTypeChange.bind(this)}/> {types}</li>
				})}
				<br/><br/><br/>	
			</div>
			<div><img style={imageSize} src={this.state.maps || this.props.restaurants.data[1][0].map} /></div>
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
		this.setState({terminals:event.target.value},function(){
			for(var i = 0;i<this.props.restaurants.data[1].length;i++){
				if(this.props.restaurants.data[1][i].terminal===this.state.terminals){
					this.setState({maps:this.props.restaurants.data[1][i].map})
				}
			}
			
			this.props.fetchFilter(this.state)	
		})
		
	}
	grabFilters(event){
		event.preventDefault();
		//console.log("now here",event)

	}

}


function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchFilter},dispatch)
}
function mapStateToProps(state){
  return {restaurants : state.restaurants}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)