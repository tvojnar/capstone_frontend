import React, { Component } from 'react';
import $ from 'jquery';

class Form extends Component {
  constructor(props) {
    super(props);

    // QUESTION: shoud i set an initial state for the start and end date?
    this.state = {
      name: '',
      description: '',
      start_lat: '',
      start_lng: '',
      start_date: '',
      end_date: '',
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

    console.log('in handleChange');
    // set the stateKey based on the id on the input field that was changed
    const stateKey = event.target.id;
    console.log(stateKey);

    const stateValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    // create an empty object
    let stateUpdate = {}

    // add a single key:value pair to the stateUpdate hash
    // create the hash out here because if i do it in setState line below it doesn't format stateKey into a key correctly so the state isn't updated
    stateUpdate[stateKey] = stateValue;
    console.log(stateValue);
    // update the state with the input value
    this.setState(stateUpdate)
  }// handleChange



  handleSubmit(e) {
    const err = this.validate();

      this.setState({
        name: '',
        description: '',
        start_lat: '',
        start_latError: '',
        start_lng: '',
        start_lngError: '',
        start_date: '',
        start_dateError: '',
        end_date: '',
        endDateError: '',
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
      })
    




    // NOTE: rails will automatically convert string numbers into floats or intergers depending on the data type for the column that data is being added to. It will also reformat dates if they are in year-month-date format ("2018-01-09")
    e.preventDefault();
    console.log('in handleSubmit');
    console.log(this.state);
    // console.log(typeof this.state.start_date);
    // console.log(typeof this.state.miles);

    // TODO: clear form by resetting state to ''

    const hikeParams = {
      hike: this.state
    }


    if (this.refs.name.value === '') {
    //   // TODO: make this provide an error message on the page
    //   // TODO: need to check all the other required fields to make sure data was entered!
    //   // TODO: see if there are client side validations in react
      alert('Name is required');
    } else {
    //   // make an api call
    //   // then we need to somehow make another get request to get the new hike to show up
      const url = `/api/hikes`
    $.ajax({
      type: "POST",
      url: url,
      data: hikeParams,
      success: function(data){
        console.log('successful post');
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('in error');
        console.log(err);
        // TODO: Display error message that the api call did not work.
      } // error
    })
    }
  }

  render() {
    let regionOptions = this.props.regions.map(region => {
      return <option key={region} id={region} value={region}>{region}</option>
    })

    return(
      <form onSubmit={this.handleSubmit.bind(this)}>

      <label>
      Name:
      <input
      type="text" ref="name" id='name' value={this.state.name} onChange={this.handleChange}/>
      </label>
      <br />



      <label>Region</label>
      <select id="region" value={this.state.region} onChange={this.handleChange}>
      {regionOptions}
      </select>
      <br/>

      <label>
      Latitude:
      <input
      type="number" id='start_lat' value={this.state.start_lat} onChange={this.handleChange} />
      </label>
      <br />

      <label>
      Longitude:
      <input
      type="number" id='start_lng' value={this.state.start_lng} onChange={this.handleChange}/>
      </label>
      <br />

      <label>Start date</label>
      <input type="date" id="start_date" value={this.state.start_date} onChange={this.handleChange}/>
      <br/>

      <label>End date</label>
      <input type="date" id="end_date" value={this.state.end_date} onChange={this.handleChange}/>
      <br/>

      <label>
      Miles:
      <input
      type="number" id='miles' value={this.state.miles} onChange={this.handleChange}/>
      </label>
      <br />

      <label>
      Elevation gain:
      <input
      type="number" id='elevation_gain' value={this.state.elevation_gain} onChange={this.handleChange}/>
      </label>
      <br />


      <label>
      Max elevation:
      <input
      type="number" id='max_elevation' value={this.state.max_elevation} onChange={this.handleChange}/>
      </label>
      <br />

      <label>
      Description:
      <textarea id='description' value={this.state.description} onChange={this.handleChange}/>
      </label>
      <br />

      <label>
      Notes:
      <textarea id='notes' value={this.state.notes} onChange={this.handleChange}/>
      </label>
      <br />



      <input id="lakes" type="checkbox" checked={this.state.lakes}
      onChange={this.handleChange} />
      <label>Lakes</label>
      <br />

      <input id="coast" type="checkbox" checked={this.state.coast}
      onChange={this.handleChange} />
      <label>Coast</label>
      <br />

      <input id="rivers" type="checkbox" checked={this.state.rivers}
      onChange={this.handleChange} />
      <label>Rivers</label>
      <br />

      <input id="waterfalls" type="checkbox" checked={this.state.waterfalls}
      onChange={this.handleChange} />
      <label>Waterfalls</label>
      <br />

      <input id="fall_foliage" type="checkbox" checked={this.state.fall_foliage}
      onChange={this.handleChange} />
      <label>Fall foliage</label>
      <br />

      <input id="wildflowers" type="checkbox" checked={this.state.wildflowers}
      onChange={this.handleChange} />
      <label>Wildflowers</label>
      <br />

      <input id="medows" type="checkbox" checked={this.state.medows}
      onChange={this.handleChange} />
      <label>Medows</label>
      <br />

      <input id="old_growth" type="checkbox" checked={this.state.old_growth}
      onChange={this.handleChange} />
      <label>Old-groath</label>
      <br />

      <input id="mountain_views" type="checkbox" checked={this.state.mountain_views}
      onChange={this.handleChange} />
      <label>Mountain views</label>
      <br />

      <input id="summits" type="checkbox" checked={this.state.summits}
      onChange={this.handleChange} />
      <label>Summits</label>
      <br />

      <input id="established_campsites" type="checkbox" checked={this.state.established_campsites}
      onChange={this.handleChange} />
      <label>Established campsites</label>
      <br />

      <input id="day_hike" type="checkbox" checked={this.state.day_hike}
      onChange={this.handleChange} />
      <label>Day hike</label>
      <br />

      <input id="overnight" type="checkbox" checked={this.state.overnight}
      onChange={this.handleChange} />
      <label>Overnight</label>
      <br />

      <input type='submit' value="submit"/>

      </form>
    ) // return

  } // render
} // form

export default Form
