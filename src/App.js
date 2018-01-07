import React, { Component } from 'react';
import Map from './components/Map';
import Form from './components/Form';
import { AddHike } from './components/AddHike';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)

    this.renderMap = this.renderMap.bind(this);
  }

  renderMap() {
    
  }
  render() {
    return (
      <div>
        <AddHike />
        <Map />
      </div>
    );
  }
}

export default App;
