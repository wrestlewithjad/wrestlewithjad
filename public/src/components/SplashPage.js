import React, { Component } from 'react';
import LogInOut from './LogInOut'
import SearchBar from './searchBar';
import RestaurantList from './RestaurantList'
import Filter from './filter'

export default class App extends Component {
  render() {
    return (
      <div>
      <LogInOut />
      <SearchBar />
      <Filter />
      <RestaurantList />
      </div>
    );
  }
}
