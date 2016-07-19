import React, { Component, StyleSheet } from 'react';
import ReactDOM from 'react-dom';
import Carousel from 'nuka-carousel'

//This is just a nuka-carousel.  there is terrible documentation for it so you might want to remove this and replace it with a better carousel type.
//Also, this seems to make things weird when you open up the debugger console.
//On the plus side, did you know that a stoat (the animal in the last picture) can a much larger rabbit?  Pretty crazy.  
var SplashCarousel = React.createClass({
  render: function() {
    return (
      <Carousel className='splashCarousel' dragging={true} autoplay={true} wrapAround={true} decorators={Decorators} >
        <img 
          src="http://i2.cdn.turner.com/money/dam/assets/150702112634-oneworld-lax-fireplace-1100x619.jpg"/>
        <img 
          src="http://www.trbimg.com/img-51c9f056/turbine/hc-bradley-airport-elevating-bar-food-options-for-travelers-20130625/650/650x366"/>
        <img 
          src="http://v028o.popscreen.com/eDdqdDBxMTI=_o_liar-liar-stopping-the-plane.jpg"/>
        <img
          src="https://cdn2.vox-cdn.com/thumbor/K9Fc2pd1UAa6BwFcf8azTZT6RIQ=/cdn0.vox-cdn.com/uploads/chorus_asset/file/3717082/deltalaguardia.0.jpg"/>
        <img
          src="http://img10.deviantart.net/c827/i/2011/103/2/7/stoat_air_by_semc-d3dvpbf.png"/>
          
      </Carousel>
    )
  }
});

var Decorators = [{
  component: React.createClass({
    render() {
      return (
        <div></div>
      )
    }
  }),
  position: 'CenterLeft',
  style: {
    padding: 20,
    flex: 1,
    resizeMode: 'stretch',
  }
}];



export default SplashCarousel;




