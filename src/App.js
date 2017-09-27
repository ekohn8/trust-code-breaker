import React, { Component } from 'react';
import Radium from 'radium';
import Game from './containers/Game';
import './App.css';

class App extends Component {


  render() {
    return (
        <Game/>
    );
  }
}

export default Radium(App);
