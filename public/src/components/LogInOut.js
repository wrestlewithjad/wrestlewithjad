  import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import {fetchSessionID,fetchLogState} from '../actions/actions';
import Reviews from './Reviews'

class LogInOut extends Component {


  constructor(props){
    super(props)
    this.state={userName:"",
                password:"",
                loaded:false,
                usernameError: false,
                passwordErrod:false,
                showForms:this.props.logState,
                loginClick:'button',
                signupClick:'button'
                }  //Might need to turn this into a prop force entire app to load at once.
              this.props.fetchLogState(false)

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
      <div className = 'LogBox'>

      {this.state.loaded?<div>
      
      {this.props.sessionID.length ===0 ? <div><form><button className = 'btn' type = {this.state.signupClick} onClick = {this.onSignUp.bind(this)}>Sign Up!</button>
                                            <button className = 'btn' type = {this.state.loginClick} onClick = {this.onLogIn.bind(this)}>Log In!</button>
                                         <a href = '/facebookLogin' className = "btn btn-danger">facebook! </a>
      {this.props.logState  ? <div><input type = 'text' className = "form-control" placeholder = 'email' value = {this.state.userName} onChange={event => this.onUserNameChange(event.target.value)}/>             
        {this.state.usernameError?<div>{this.state.usernameError}</div> : null}
        <input type = 'password' className = "form-control" placeholder = 'password' value = {this.state.password} onChange={event =>this.onPasswordChange(event.target.value)}/>
              {this.state.passwordError?<div>{this.state.passwordError}</div> :null } </div>:null}
      </form>
      </div>: 
       <button className = 'btn' type = 'button' onClick = {this.onLogOff.bind(this)}>Log Off!</button>}
       
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
     if(this.props.logState === false){
      this.setState({signupClick:'submit'})
      this.props.fetchLogState(true)
    }

    else{

    axios.post('/signup',{username : this.state.userName, password : this.state.password}).then(value=>{
      this.props.fetchSessionID(value.data)
      this.setState({usernameError:false})
    }).catch((err)=>{
      this.setState({usernameError:'Username already taken'})
      console.log("errrrr",err)
    })
  }
  }
  onLogIn(event){
    event.preventDefault();
    console.log('thisstate',this.state.showForms,this.props.logState)
    if(this.props.logState === false){
      this.props.fetchLogState(true)
      this.setState({loginClick:'submit'})
    }
    else{
    axios.post('/logIn',{username:this.state.userName, password:this.state.password}).then(value =>{
      this.props.fetchSessionID(value.data)
      console.log('log in value',value);
      this.setState({passwordError:false})
    }).catch((err)=>{
      this.setState({passwordError:'Username or Password incorrect'})
      console.log("error",err)
    })
  }
  }
  onLogOff(event){
    event.preventDefault();
    this.props.fetchLogState(false)
    this.setState({loginClick:'button',signupClick:'button'})
    console.log(this.props.sessionID)
    axios.post('/logOff',{id:this.props.sessionID}).then(() =>{
        this.props.fetchSessionID("");
        this.setState({userName:"",password:""})
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
  return bindActionCreators({fetchSessionID,fetchLogState},dispatch)
}

function mapStateToProps(state){
  return {sessionID : state.sessionID, logState: state.logState}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInOut)
