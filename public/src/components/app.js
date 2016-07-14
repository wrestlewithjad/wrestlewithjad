import React, { Component } from 'react';
import SplashPage from './SplashPage'
import SplashCarousel from './SplashCarousel'



export default class App extends Component {
  render() {
    return (
      <div>This is the App layer
      <SplashPage />
	  <SplashCarousel />
      </div>
    );
  }
}
