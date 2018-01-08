import React, { Component } from 'react';
import Map from './components/Map';
import { AddHike } from './components/AddHike';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)

    this.renderMap = this.renderMap.bind(this);
  }

  // renderMap is a function that will trigger a be passed to both the AddHike form so that when it is submitted the app makes a new api call so that the hike that was added is rendered right away
  renderMap() {

  } // renderMap

  // because we linked Map as Apps child via onRef this method will call the fetchHikesFromApi function in Map
  // passing this function as a prop to AddHike -> AddHikeModal -> Form will allow the Form component to call this function when the form is submitted so that the map re-render right away to show the new hike that was added
  handleFetchHikes = () => {
    this.child.fetchHikesFromApi();
  }



  render() {
    // we are connecting Map via the 'Refs to components' approach so that we can call Maps methods from App (see handleFetchHikes method above for example of this)
    return (
      <div>
        <AddHike fetchHikes={this.handleFetchHikes}/>
        <Map onRef={ref => (this.child = ref)}/>
      </div>
    );
  }
}

export default App;
