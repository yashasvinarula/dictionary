import React, { Component } from 'react';
import './App.css';
import HomePage from './components/HomePage'

class App extends Component {
  render() {
    return (
      <div className = 'grey lighten-2' style = {{maxHeight: '100vh', overflow: 'hidden'}}>
        <HomePage />
      </div>
    );
  }
}

export default App;
