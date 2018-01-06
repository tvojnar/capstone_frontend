import * as React from 'react';
import Link, { LinkedComponent } from 'valuelink';
import { Input } from 'valuelink/tags';
import { Select } from 'valuelink/tags';
import $ from 'jquery';

class Form extends LinkedComponent {

  constructor(props) {
    super(props);

    this.state = this.props.initialState;
  }


  static defaultProps = {
    regions: ['Central Washington', 'Eastern Washington', 'North Cascades', 'Mount Rainier Area', 'Puget Sound and Islands', 'Olympic Peninsula', 'Snoqualmie Region', 'South Cascades', 'Central Cascades', 'Issaquah Alps', 'Southwest Washington', 'Mount Adams', 'Mount Hood', 'Columbia Gorge', 'Oregon Coast', ],
    initialState: {
      name: '',
      nameError: false,
      description: '',
      start_lat: '',
      latError: false,
      start_lng: '',
      lngError: false,
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
  }

  onSubmit = e => {
    // NOTE: rails will automatically convert string numbers into floats or intergers depending on the data type for the column that data is being added to. It will also reformat dates if they are in year-month-date format ("2018-01-09")

    e.preventDefault();
    console.log('in handleSubmit');
    console.log(this.state);
    // console.log(typeof this.state.start_date);
    // console.log(typeof this.state.miles);

    // TODO: clear form by resetting state to ''
    let readyToSubmit = true;

    if (this.state.name === '') {
      this.setState({nameError: true})
      readyToSubmit = false;
    } else {
      this.setState({nameError: false})
      readyToSubmit = true;
    }

    if (this.state.start_lat === '') {
      this.setState({latError: true })
      readyToSubmit = false;
    } else {
      this.setState({latError: false})
      readyToSubmit = true;
    }

    if (this.state.start_lng === '') {
      this.setState({lngError: true })
      readyToSubmit = false;
    } else {
      this.setState({lngError: false})
      readyToSubmit = true;
    }


    if (readyToSubmit) {
    const hikeParams = {
      hike: this.state
    }

    this.setState(this.props.initialState);

    const url = `/api/hikes`

    $.ajax({
      type: "POST",
      url: url,
      data: hikeParams,
      success: function(data){
        console.log('successful post');
        console.log(data);
      },
      error: function(xhr, status, err) {
        console.log('in error');
        console.log(err);
        // TODO: Display error message that the api call did not work.
      } // error
    }) // post
  } // if/else
  } // onSubmit





  render() {

    let regionOptions = this.props.regions.map(region => {
      return <option key={region} value={region}>{region}</option>
    })

    const linked = this.linkAll(); // wrap all state members in links

    const nameLink = Link.state(this, 'name'),
      nameIsValid = nameLink.value

    const latLink = Link.state(this, 'start_lat'),
      latIsValid = latLink.value

    const lngLink = Link.state(this, 'start_lng'),
      lngIsValid = lngLink.value



    let nameBox;
    let latBox;
    let lngBox;

    if (this.state.nameError) {
      nameBox = <label>
        Name: <Input type="text"
                      className={ nameIsValid ? '' : 'invalid'}
                      valueLink={ nameLink } />
              <div className='error-placeholder'>
                { nameIsValid ? '' : 'Name is required'}
              </div>
      </label>
    } else {
      nameBox = <label>
        Name: <Input type="text" valueLink={ nameLink } />
      </label>
    }

    if (this.state.latError) {
      latBox = <label>
        Starting latitude: <Input type="text"
                      className={ latIsValid ? '' : 'invalid'}
                      valueLink={ latLink } />
              <div className='error-placeholder'>
                { latIsValid ? '' : 'Starting latitude is required'}
              </div>
      </label>
    } else {
      latBox = <label>
        Starting latitude: <Input type="text" valueLink={ latLink } />
      </label>
    }

    if (this.state.lngError) {
      lngBox = <label>
        Starting longitude: <Input type="text"
                      className={ lngIsValid ? '' : 'invalid'}
                      valueLink={ lngLink } />
              <div className='error-placeholder'>
                { lngIsValid ? '' : 'Starting longitude is required'}
              </div>
      </label>
    } else {
      lngBox = <label>
        Starting longitude: <Input type="text" valueLink={ lngLink } />
      </label>
    }

    return(
      <form onSubmit={this.onSubmit}>

      { nameBox }

      { latBox }

      { lngBox }

      <label>
        Region: <Select valueLink={ linked.region }>{regionOptions}</Select>
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
