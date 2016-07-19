import React, { Component } from 'react';
import SplashPage from './SplashPage'
import SplashCarousel from './SplashCarousel'
import NamePlate from './namePlate'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';

 class App extends Component {
  //All this does is show the carousel if there is not restaurant and airport name data.
  render() {
    return (
      <div >
      <NamePlate />

      {this.props.airport && this.props.restaurantList.data ? null:<SplashCarousel />}
      <SplashPage />
	  
      </div>
    );
  }
}

function mapStateToProps(state){
  return {restaurantList: state.restaurants, airport:state.airportName}
}

export default connect(mapStateToProps)(App)

