import React, { Component } from 'react';
import Map from './components/Map';
import Form from './components/Form';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Form />
        <Map />
      </div>
    );
  }
}

export default App;
