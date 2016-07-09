import React, { Component } from 'react';
import axios from 'axios'


export default class App extends Component {
  render() {
    return (
      <div><button onClick = {this.onButtonClick.bind(this)}>Click me!</button>
      <a href = '/auth/github'> Try thiis </a>
      </div>
    );
  }

  onButtonClick(event){   //Have clicking signup call parent component to show email/password forms
  	event.preventDefault();
  	axios.post('/signup').then(function(value){
  		console.log("value",value)
  	})
  	//this.props.fetchComment(this.state.term)
  	//this.setState({term:""})
  	console.log("hello")
  }
}