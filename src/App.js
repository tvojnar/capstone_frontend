import React, { Component } from 'react';
import Map from './components/Map';
import Form from './components/Form';
import './App.css';
import Modal from 'react-modal';
import ErrorModal from './modal/ErrorModal'

class App extends Component {
  render() {
    return (
      <div>
        <ErrorModal />
        <Form />
        <Map />
      </div>
    );
  }
}

export default App;
