import React, { Component } from 'react';
import SplashPage from './SplashPage'
import SplashCarousel from './SplashCarousel'



export default class App extends Component {
  render() {
    return (
      <div className="fixthisshit">
      <SplashPage />
	  <SplashCarousel />
      </div>
    );
  }
}
