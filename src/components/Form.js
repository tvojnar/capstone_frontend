import React, { Component } from 'react';
import $ from 'jquery';

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
      // TODO: see if there are client side validations in react
      alert('Name is required');
    } else {
      // make an api call
      // then we need to somehow make another get request to get the new hike to show up
      const url = `/api/hikes`
      $.ajax({
        type: "POST",
        url: url,
        success: function(data){
          console.log('successful post');
          console.log(data);
        }.bind(this),
        error: function() {
          // TODO
        }
      })
    }
  }

  render() {
    let regionOptions = this.props.regions.map(region => {
      return <option key={region} value="region">{region}</option>
    })

    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Name</label>
        <input
          type="text" placeholder='Name of hike' ref="name" />
        <br/>

        <label>Region</label>
        <select ref="category">
          {regionOptions}
        </select>
        <br/>

        <label>Latitude</label>
        <input type="text" placeholder='Starting latitude' ref="latitude"/>
        <br/>

        <label>Longitude</label>
        <input type="text" placeholder='Starting longitude' ref="longitude"/>
        <br/>

        <label>Start date</label>
        <input type="date" ref="startDate"/>
        <br/>

        <label>End date</label>
        <input type="date"  ref="endDate"/>
        <br/>

        <label>Miles</label>
        <input type="text" placeholder='Total miles hiked' ref="miles"/>
        <br/>

        <label>Elevation gain</label>
        <input type="text" ref="elevationGain"/>
        <br/>


        <label>Highest elevation</label>
        <input type="text" ref="highestElevation"/>
        <br/>

        <label>Description</label>
        <input type="text" placeholder='Hike description' ref="description"/>
        <br/>

        <label>Notes</label>
        <input type="text" placeholder='Notes about the hike' ref="notes"/>
        <br/>

        <input id="lakes" type="checkbox" ref="lakes"/>
        <label>Lakes</label>
        <br/>

        <input id="coast" type="checkbox" ref="coast"/>
        <label>Coast</label>
        <br/>

        <input id="rivers" type="checkbox" ref="rivers"/>
        <label>Rivers</label>
        <br/>

        <input id="waterfalls" type="checkbox" ref="waterfalls"/>
        <label>Waterfalls</label>
        <br/>

        <input id="fallFoliage" type="checkbox" ref="fallFoliage"/>
        <label>Fall foliage</label>
        <br/>

        <input id="wildflowers" type="checkbox" ref="wildflowers"/>
        <label>Wildflowers</label>
        <br/>

        <input id="medows" type="checkbox" ref="medows"/>
        <label>Medows</label>
        <br/>

        <input id="mountainViews" type="checkbox" ref="mountainViews"/>
        <label>Mountain views</label>
        <br/>

        <input id="summits" type="checkbox" ref="summits"/>
        <label>Summits</label>
        <br/>

        <input id="establishedCampsites" type="checkbox" ref="establishedCampsites"/>
        <label>Established campsites</label>
        <br/>

        <input id="dayHike" type="checkbox" ref="rivers"/>
        <label>Day hike</label>
        <br/>

        <input id="overnight" type="checkbox" ref="overnight"/>
        <label>Overnight</label>
        <br/>

        <input id="oldGrowth" type="checkbox" ref="oldGrowth"/>
        <label>Old growth</label>
        <br/>


        <input type='submit' value="submit"/>

      </form>
    ) // return

  } // render
} // form

export default Form
