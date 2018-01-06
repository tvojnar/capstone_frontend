import * as React from 'react';
import Link, { LinkedComponent } from 'valuelink';
import { Input } from 'valuelink/tags';
import $ from 'jquery';

class Form extends LinkedComponent {
  constructor(props) {
    super(props);

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
    };
  }

  static defaultProps = {
    regions: ['Central Washington', 'Eastern Washington', 'North Cascades', 'Mount Rainier Area', 'Puget Sound and Islands', 'Olympic Peninsula', 'Snoqualmie Region', 'South Cascades', 'Central Cascades', 'Issaquah Alps', 'Southwest Washington', 'Mount Adams', 'Mount Hood', 'Columbia Gorge', 'Oregon Coast', ]
  }

  onSubmit = e => {
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
    }) // post

  } // onSubmit


  render() {
    let regionOptions = this.props.regions.map(region => {
      return <option key={region} value="region">{region}</option>
    })

    const linked = this.linkAll(); // wrap all state members in links

    return(
      <form onSubmit={this.onSubmit}>
        <label>
          Name: <Input valueLink={ linked.name } />
        </label>

        <label>
          Latitude: <Input type="number" valueLink={ linked.start_lat } />
        </label>

        <label>
          Longitude: <Input type="number" valueLink={ linked.start_lng } />
        </label>

        <label>
          Start date: <Input type="date" valueLink={ linked.start_date } />
        </label>

        <label>
          End date: <Input type="date" valueLink={ linked.end_date } />
        </label>

        <label>
          Miles: <Input type="number" valueLink={ linked.miles } />
        </label>

        <label>
          Elevation gain: <Input type="number" valueLink={ linked.elevation_gain } />
        </label>

        <label>
          Max elevation: <Input type="number" valueLink={ linked.max_elevation } />
        </label>

        <label>
          Description: <Input valueLink={ linked.description } />
        </label>

        <label>
          Notes: <Input valueLink={ linked.notes } />
        </label>

        <label>
          Lakes: <Input type="checkbox" valueLink={ linked.lakes } />
        </label>

        <label>
          Coast: <Input type="checkbox" valueLink={ linked.coast } />
        </label>

        <label>
          Rivers: <Input type="checkbox" valueLink={ linked.rivers } />
        </label>

        <label>
          Waterfalls: <Input type="checkbox" valueLink={ linked.waterfalls } />
        </label>

        <label>
          Fall foliage: <Input type="checkbox" valueLink={ linked.fall_foliage } />
        </label>

        <label>
          Wildflowers: <Input type="checkbox" valueLink={ linked.wildflowers } />
        </label>

        <label>
          Medows: <Input type="checkbox" valueLink={ linked.medows } />
        </label>

        <label>
          Old-growth: <Input type="checkbox" valueLink={ linked.old_growth } />
        </label>

        <label>
          Mountain views: <Input type="checkbox" valueLink={ linked.mountain_viwes } />
        </label>

        <label>
          Summits: <Input type="checkbox" valueLink={ linked.summits } />
        </label>

        <label>
          Established campsites: <Input type="checkbox" valueLink={ linked.established_campsites } />
        </label>

        <label>
          Day hike: <Input type="checkbox" valueLink={ linked.day_hike } />
        </label>

        <label>
          Overnight: <Input type="checkbox" valueLink={ linked.overnight } />
        </label>

        <button type='submit'>Submit</button>

      </form>
    ) // return

  } // render
} // form

export default Form
