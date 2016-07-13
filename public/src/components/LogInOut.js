import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import {fetchSessionID} from '../actions/actions';

class LogInOut extends Component {


  constructor(props){
    super(props)
    this.state={userName:"",
                password:"",
                loaded:false,
                usernameError: false,
                passwordErrod:false
                }  //Might need to turn this into a prop force entire app to load at once.


  }
  componentDidMount(){     //Think about putting the axios in the render function to prevent the split second switch.  Would force a lot of server calls though
    axios.get('/LoggedIn').then(value =>{   
        if(value.data)
          this.props.fetchSessionID(value.data);
        else
          this.props.fetchSessionID("");
        this.setState({loaded:true})
      })
    
      }


  render() {
    return (
      <div>
      {this.state.loaded?<div>
      
      {this.props.sessionID.length ===0 ? <div><form><button type = 'submit' onClick = {this.onSignUp.bind(this)}>Sign Up!</button>
                                            <button type = 'submit' onClick = {this.onLogIn.bind(this)}>Log In!</button>
                                         
        <input type = 'text' className = "form-control" placeholder = 'email' value = {this.state.userName} onChange={event => this.onUserNameChange(event.target.value)}/>             
        {this.state.usernameError?<div>{this.state.usernameError}</div> : null}
        <input type = 'text' className = "form-control" placeholder = 'password' value = {this.state.password} onChange={event =>this.onPasswordChange(event.target.value)}/>
              {this.state.passwordError?<div>{this.state.passwordError}</div> : null}
      </form>
      </div>: 
       <button type = 'button' onClick = {this.onLogOff.bind(this)}>Log Off!</button>}
       <button type = 'button' onClick = {this.getRestaurants.bind(this)}> get Restaurants </button>
       <a href = '/facebookLogin' className = "btn btn-danger">facebook! </a>
      </div>:null}
      </div>
    );
  }
  onUserNameChange(userName){
    this.setState({userName})
  }
  onPasswordChange(password){
    this.setState({password})
  }

  onSignUp(event){   //Have clicking signup call parent component to show email/password forms
  	event.preventDefault();
    console.log('sign up event')
  	axios.post('/signup',{username : this.state.userName, password : this.state.password}).then(value=>{
      this.props.fetchSessionID(value.data)
      this.setState({usernameError:false})
  	}).catch((err)=>{
      this.setState({usernameError:'Username already taken'})
      console.log("errrrr",err)
    })
  	//this.props.fetchComment(this.state.term)
  	//this.setState({term:""})
  }
  onLogIn(event){
    event.preventDefault();
    axios.post('/logIn',{username:this.state.userName, password:this.state.password}).then(value =>{
      this.props.fetchSessionID(value.data)
      console.log('log in value',value);
      this.setState({passwordError:false})
    }).catch((err)=>{
      this.setState({passwordError:'Username or Password incorrect'})
      console.log("error",err)
    })

  }
  onLogOff(event){
    event.preventDefault();
    console.log(this.props.sessionID)
    axios.post('/logOff',{id:this.props.sessionID}).then(() =>{
        this.props.fetchSessionID("");
    })
  
  }
  getRestaurants(event){
    event.preventDefault();
    console.log("hea");
     axios.get('/restaurantList',{id:this.props.sessionID}).then(function(value){
       console.log("here",value)
       axios.post('/review',{airport:1,restaurant:1,score:1}).then(function(reviewValue){
        console.log('RV',reviewValue);
       })
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
