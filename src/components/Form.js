import React, { Component } from 'react';
import $ from 'jquery';

class Form extends Component {
  constructor(props) {
    super(props);

    // QUESTION: shoud i set an initial state for the start and end date?
    this.state = {
      name: '',
      description: 'Hike description',
      start_lat: '',
      start_lng: '',
      region: 'Central Washington',
      miles: '',
      elevation_gain: '',
      max_elevation: '',
      notes: '',
      lakes: false,
      coast: false,
      rivers: false,
      waterfalls: false,
      fall_foliage: false,
      wildflowers: false,
      medows: false,
      mountain_viwes: false,
      summits: false,
      established_campsites: false,
      day_hike: false,
      overnight: false,
      old_growth: false,
    }

    this.handleChange = this.handleChange.bind(this);
  } // constructor

  static defaultProps = {
    regions: ['Central Washington', 'Eastern Washington', 'North Cascades', 'Mount Rainier Area', 'Puget Sound and Islands', 'Olympic Peninsula', 'Snoqualmie Region', 'South Cascades', 'Central Cascades', 'Issaquah Alps', 'Southwest Washington', 'Mount Adams', 'Mount Hood', 'Columbia Gorge', 'Oregon Coast', 'Other' ]
  }

  handleChange(event) {

    // set the stateKey based on the id on the input field that was changed
    const stateKey = event.target.id;

    // create an empty object
    let stateUpdate = {}

    // add a single key:value pair to the stateUpdate hash
    // create the hash out here because if i do it in setState line below it doesn't format stateKey into a key correctly so the state isn't updated
    stateUpdate[stateKey] = event.target.value
    // update the state with the input value
    this.setState(stateUpdate)
  }// handleChange

  handleSubmit(e) {
    //TODO: this is where I would make the api call
    e.preventDefault();
    console.log('in handleSubmit');
    console.log(this.state.name);
    //
    // const hikeParams = {
    //   hike: {
    //     name:
    //   }
    // }


    // if (this.refs.name.value === '') {
    //   // TODO: make this provide an error message on the page
    //   // TODO: need to check all the other required fields to make sure data was entered!
    //   // TODO: see if there are client side validations in react
    //   alert('Name is required');
    // } else {
    //   // make an api call
    //   // then we need to somehow make another get request to get the new hike to show up
    //   const url = `/api/hikes`
    // $.ajax({
    //   type: "POST",
    //   url: url,
    //   success: function(data){
    //     console.log('successful post');
    //     console.log(data);
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.log('in error');
    //     console.log(err);
    //     // TODO: Display error message that the api call did not work.
    //   } // error
    // })
    // }
  }

  render() {
    let regionOptions = this.props.regions.map(region => {
      return <option key={region} value="region">{region}</option>
    })

    return(
      <form onSubmit={this.handleSubmit.bind(this)}>

      <label>
      Name:
      <input
      type="text" id='name' value={this.state.name} onChange={this.handleChange}/>
      </label>



      <label>Region</label>
      <select ref="category">
      {regionOptions}
      </select>
      <br/>

      <label>
        Latitude:
        <input
        type="number" id='start_lat' value={this.state.start_lat} onChange={this.handleChange}/>
      </label>

      <label>
        Longitude:
        <input
        type="number" id='start_lng' value={this.state.start_lng} onChange={this.handleChange}/>
      </label>

      <label>Start date</label>
      <input type="date" ref="startDate"/>
      <br/>

      <label>End date</label>
      <input type="date"  ref="endDate"/>
      <br/>

      <label>
        Miles:
        <input
        type="number" id='miles' value={this.state.miles} onChange={this.handleChange}/>
      </label>

      <label>
        Elevation gain:
        <input
        type="number" id='elevation_gain' value={this.state.elevation_gain} onChange={this.handleChange}/>
      </label>


      <label>
        Max elevation:
        <input
        type="number" id='max_elevation' value={this.state.max_elevation} onChange={this.handleChange}/>
      </label>

      <label>
        Description:
        <input
        type="text" id='description' value={this.state.description} onChange={this.handleChange}/>
      </label>

      <label>
        Notes:
        <input
        type="text" id='notes' value={this.state.notes} onChange={this.handleChange}/>
      </label>

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
