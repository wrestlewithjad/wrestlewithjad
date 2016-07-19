  import React, {
    Component
  } from 'react';
  import axios from 'axios'
  import {
    connect
  } from 'react-redux'
  import {
    bindActionCreators
  } from 'redux';
  import {
    fetchSessionID,
    fetchLogState,
    fetchRestaurants
  } from '../actions/actions';
  import Reviews from './Reviews'

  class LogInOut extends Component {


    constructor(props) {
      super(props)
      this.state = {
        userName: "",
        password: "",
        loaded: false,
        usernameError: false,
        passwordErrod: false,
        showForms: this.props.logState, //you don't need this to be a prop with redux, I just made it one so you can have a really simple one to look at
        loginClick: 'button',
        signupClick: 'button'
      }
      this.props.fetchLogState(false) //When the log button is constructed, send Redux a logState of false


    }

    componentDidMount() {
      axios.get('/LoggedIn').then(value => { //if the user is logged in when it's rendered, 
        if (value.data)
          this.props.fetchSessionID(value.data); //give the session ID to redux
        else
          this.props.fetchSessionID(""); //else give the session id of ""
        this.setState({
            loaded: true
          }) //set the state of loaded to true
      })

    }



    render() {

        return ( < div className = 'LogBox' >

            {
              this.state.loaded ? < div >

              {
                this.props.sessionID.length === 0 ? < div > < form > < button className = 'btn'
                type = {
                  this.state.signupClick
                }
                onClick = {
                  this.onSignUp.bind(this)
                } > Sign Up! < /button> < button className = 'btn'
                type = {
                  this.state.loginClick
                }
                onClick = {
                  this.onLogIn.bind(this)
                } > Log In! < /button> < a href = '/facebookLogin'
                className = "btn btn-danger" > facebook! < /a> {
                  this.props.logState ? < div > < input type = 'text'
                  className = "form-control"
                  placeholder = 'email'
                  value = {
                    this.state.userName
                  }
                  onChange = {
                    event => this.onUserNameChange(event.target.value)
                  }
                  />              {
                    this.state.usernameError ? < div > {
                      this.state.usernameError
                    } < /div> : null} < input type = 'password'
                    className = "form-control"
                    placeholder = 'password'
                    value = {
                      this.state.password
                    }
                    onChange = {
                      event => this.onPasswordChange(event.target.value)
                    }
                    /> {
                      this.state.passwordError ? < div > {
                        this.state.passwordError
                      } < /div> :null } </div > : null
                    } < /form> < /div>:  < button className = 'btn'
                    type = 'button'
                    onClick = {
                      this.onLogOff.bind(this)
                    } > Log Off! < /button>}

                    < /div>:null} < /div>

                  );
                }
                onUserNameChange(userName) { //this just sets the username to what is being typed in the state
                  this.setState({
                    userName
                  })
                }
                onPasswordChange(password) { //same but for password
                  this.setState({
                    password
                  })
                }

                onSignUp(event) { //when you hit sign up
                  event.preventDefault();
                  if (this.props.logState === false) { //so if logState is false
                    this.setState({
                        signupClick: 'submit'
                      }) //tell state that it's been clicked.  Hitting enter in the log box will now default to signup.
                    this.props.fetchLogState(true) //now send the value logState = true to Redux
                  } else { //this if/else statement essentially makes it so the first time you hit sign up, the forms appear, the 2nd time it submits the data
                    axios.post('/signup', {
                      username: this.state.userName,
                      password: this.state.password,
                      city: this.props.airportName
                    }).then(value => {
                      this.props.fetchRestaurants({
                          data: value.data.yourReviews
                        }) //Set restaurants in Redux
                      this.props.fetchSessionID(value.data) // Set session ID in Redux
                      this.setState({
                          usernameError: false
                        }) // say there is no error for the username
                    }).catch((err) => {
                      this.setState({
                          usernameError: 'Username already taken'
                        }) //say there is an error for the username, this changes if some divs show.
                      console.log("errrrr", err) //when 2 r's is never enough
                    })
                  }
                }
                onLogIn(event) { //When hitting log in
                  event.preventDefault();
                  if (this.props.logState === false) { //just like signup
                    this.props.fetchLogState(true)
                    this.setState({
                      loginClick: 'submit'
                    })
                  } else {
                    axios.post('/logIn', {
                      username: this.state.userName,
                      password: this.state.password,
                      city: this.props.airportName
                    }).then(value => {
                      this.props.fetchRestaurants({
                        data: value.data.yourReviews
                      })
                      this.props.fetchSessionID(value.data.sessionID)
                      this.setState({
                        passwordError: false
                      })
                    }).catch((err) => {
                      this.setState({
                        passwordError: 'Username or Password incorrect'
                      })
                      console.log("error", err)
                    })
                  }
                }
                onLogOff(event) { //when you log off.
                  event.preventDefault();
                  this.props.fetchLogState(false) //tell log state you are logged off.  This makes certain divs appear/dissapear
                  this.setState({
                      loginClick: 'button', //set these two back to buttons so that the next person who signs in will have these work like expected
                      signupClick: 'button'
                    }) 
                  axios.post('/logOff', {   //send logoff to axios
                    id: this.props.sessionID
                  }).then(() => {
                    this.props.fetchSessionID("");  //no more session id
                    this.setState({   //make sure username and password fields are blank
                      userName: "",
                      password: "",
                      passwordError:false,  //don't want these errors popping up after you log off
                      usernameError:false
                    })
                  })
                }
              }
              function mapDispatchToProps(dispatch) { //Think of mapDispatchToProps as this is how you SEND stuff to the store
                return bindActionCreators({
                  fetchSessionID,
                  fetchLogState,
                  fetchRestaurants
                }, dispatch)
              }

              function mapStateToProps(state) { //this of mapStateToProps as this is how you GET stuff from the store
                return {
                  sessionID: state.sessionID,
                  logState: state.logState,
                  airportName: state.airportName
                }
              }

              export default connect(mapStateToProps, mapDispatchToProps)(LogInOut)  //connect the redux components to this component