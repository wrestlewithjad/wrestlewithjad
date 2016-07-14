import React, { Component } from 'react';
import LogInOut from './LogInOut'
import SearchBar from './searchBar';
import RestaurantList from './RestaurantList'

export default class App extends Component {
  render() {
    return (
      <div>This is the Splash Page
      <div>
      <LogInOut />
      <SearchBar />
      <RestaurantList />
      </div>
      </div>
    );
  }
}
