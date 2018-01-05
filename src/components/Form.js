import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      start_lat: '',
      start_lng: '',
    }
  }

  static defaultProps = {
    regions: ['Central Washington', 'Eastern Washington', 'North Cascades', 'Mount Rainier Area', 'Puget Sound and Islands', 'Olympic Peninsula', 'Snoqualmie Region', 'South Cascades', 'Central Cascades', 'Issaquah Alps', 'Southwest Washington', 'Mount Adams', 'Mount Hood', 'Columbia Gorge', 'Oregon Coast', ]
  }

  handleSubmit(e) {
    //TODO: this is where I would make the api call
    e.preventDefault();
    console.log('in handleSubmit');
    console.log(this.refs.name.value);
    if (this.refs.name.value === '') {
      // TODO: make this provide an error message on the page
      // TODO: need to check all the other required fields to make sure data was entered!
      alert('Name is required');
    } else {
      // make an api call
      // then we need to somehow make another get request to get the new hike to show up 
    }
  }

  render() {
    let regionOptions = this.props.regions.map(region => {
      return <option key={region} value="region">{region}</option>
    })

    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Hike name</label>
        <input
          type="text" placeholder='Name' ref="name" />
        <br/>

        <label>Description</label>
        <input type="text" placeholder='Hike description' ref="Description"/>
        <br/>

        <label>Latitude</label>
        <input type="text" placeholder='Starting latitude' ref="latitude"/>
        <br/>

        <label>Longitude</label>
        <input type="text" placeholder='Starting longitude' ref="longitude"/>
        <br/>

        <label>Region</label>
        <select ref="category">
          {regionOptions}
        </select>
        <br/>

        <input type='submit' value="submit"/>

      </form>
    ) // return

  } // render
} // form

export default Form
