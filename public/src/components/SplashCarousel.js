import React, { Component, StyleSheet } from 'react';
import ReactDOM from 'react-dom';
import Carousel from 'nuka-carousel'



var SplashCarousel = React.createClass({
  render: function() {
    return (
      <Carousel dragging={true} autoplay={true} wrapAround={true} decorators={Decorators} >
        <img 
          src="http://ww3.hdnux.com/photos/42/26/52/9005758/7/920x920.jpg"/>
        <img 
          src="http://www.fly2houstonspaceport.com/images/uploads/main/53057-Two_Color_HA_Logo.jpg"/>
        <img 
          src="http://airporttaxitxs.com/wp-content/uploads/2015/12/SAMPLE-21.jpg"/>

      </Carousel>
    )
  }
});

var Decorators = [{
  //still need to figure out how to remove this button
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
    resizeMode: 'cover'
  }
}];



export default SplashCarousel;




