import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import {fetchSessionID} from '../actions/actions';

class LogInOut extends Component {


  constructor(props){
    super(props)
    this.state={userName:"",
                password:""};
  }


  render() {
 console.log("ID",this.props.sessionID)
    return (
      <div>
      <form>
        <label>username</label>
        <input type = 'text' className = "form-control" value = {this.state.userName} onChange={event => this.onUserNameChange(event.target.value)}/>
        <label>Categories</label>               
        <input type = 'text' className = "form-control" value = {this.state.password} onChange={event =>this.onPasswordChange(event.target.value)}/>
        {this.props.sessionID.length ===0 ?<button type = 'submit' onClick = {this.onButtonClick.bind(this)}>Sign Up!</button>: 
        <button type = 'button' onClick = {this.onLogOff.bind(this)}>Log Off!</button>}
      </form>
      
      <a href = '/auth/github'> Try thiis </a>
      </div>
    );
  }
  onUserNameChange(userName){
    this.setState({userName})
  }
  onPasswordChange(password){
    this.setState({password})
  }

  onButtonClick(event){   //Have clicking signup call parent component to show email/password forms
  	event.preventDefault();
  	axios.post('/signup',{username : this.state.userName, password : this.state.password}).then(value=>{
      this.props.fetchSessionID(value.data)
  	}).catch(function(err){
    })
  	//this.props.fetchComment(this.state.term)
  	//this.setState({term:""})
  }
  onLogOff(event){
    event.preventDefault();
    console.log(this.props.sessionID)
    axios.post('/logOff',{id:this.props.sessionID}).then(() =>{
        this.props.fetchSessionID("");
    })
  
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchSessionID},dispatch)
}
function mapStateToProps(state){
  return {sessionID : state.sessionID}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInOut)
