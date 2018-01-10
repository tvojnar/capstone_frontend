import * as React from 'react';
// import $ from 'jquery';

// import modals to show sucess or error message after post request to add a new hike

// TODO
import ErrorModal from '../modal/ErrorModal'
import SuccessModal from '../modal/SuccessModal'


// using valueLink library to connect form fields with the components state. Also used to provide inline error handing for invalid fields in the form
import Link, { LinkedComponent } from 'valuelink';
import { Input } from 'valuelink/tags';
import { Select } from 'valuelink/tags';


class BaseForm extends LinkedComponent {

  constructor(props) {
    super(props);

    // Set the state using the default props
    this.state = this.props.initialState;

    this.trimState = this.trimState.bind(this);
  }

  // default props are used to generate the options for the select input for regions in the form and to set the state in the constructor, as well as to reset the state to clear the form
  // TODO: figure out how to set the state for the modals in form.js
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
      meadows: false,
      mountain_views: false,
      summits: false,
      established_campsites: false,
      day_hike: false,
      overnight: false,
      old_growth: false,
      showErrorModal: false,
      showSuccessModal: false,
    }
  }

  // use this function to prepopulate form input fields with the hike's data in EditForm
  componentWillMount(nextProps) {
    console.log('in componentWillReceiveProps');
    if (this.props.hikeState) {
    this.setState(this.props.hikeState)
  }
  }


  // TODO
  // function runs when the submit button is clicked on the form
  onSubmit = e => {
    // NOTE: rails will automatically convert string numbers into floats or intergers depending on the data type for the column that data is being added to. It will also reformat dates if they are in year-month-date format ("2018-01-09")


    // prevent the page reloading when the form is submitted
    e.preventDefault();


    // this.state.readyToSubmit is used to determine if there are missing fields in the form or if the form is ready to be submitted to the API
    let readyToSubmit = true
    console.log(`before all the if statements readyToSubmit: ${readyToSubmit}`);


    // check that a name, staring lat and starting lng have been entered
    // if not provided by the user then set the state so that the error message and styleing shows up around the  input field in the form. Also set readyToSubmit to false to that the form wont be submitted to the API
    if (this.state.name === '' || this.state.start_lat === '' || this.state.start_lng === '') {
      console.log('in if cause something was missing');
      readyToSubmit = false
      if (this.state.name === '') {
        console.log('NO NAME');
        this.setState({nameError: true})
      } else {
          console.log('YES NAME');
        this.setState({nameError: false})
      }

      if (this.state.start_lat === '') {
          console.log('NO LAT');
        this.setState({latError: true })
      } else {
          console.log('YES LAT');
        this.setState({latError: false })
      }

      if (this.state.start_lng === '') {
          console.log('NO LNG');
        this.setState({lngError: true })
      } else {
          console.log('YES LNG');
        this.setState({lngError: false })
      }
    } else {
        console.log('ELSE');
      readyToSubmit =  true;
    }
    // if (this.state.name === '' || this.state.name.length < 1) {
    //   console.log('in if cause there was no name');
    //   this.setState({nameError: true})
    //   this.setState({readyToSubmit: false})
    // } else {
    //     console.log('ELSE NAME');
    //   this.setState({nameError: false})
    //   this.setState({readyToSubmit: true});
    // }
    //
    // if (this.state.start_lat === '') {
    //   console.log('in if cause there was no lat');
    //   this.setState({latError: true })
    //   this.setState({readyToSubmit: false})
    // } else {
    //   console.log('ELSE LAT');
    //   this.setState({latError: false})
    //   this.setState({readyToSubmit: true})
    // }
    //
    // if (this.state.start_lng === '') {
    //   console.log('in if cause there was no lng');
    //   this.setState({lngError: true })
    //   this.setState({readyToSubmit: false})
    // } else {
    //   console.log('ELSE LNG');
    //   this.setState({lngError: false})
    //   this.setState({readyToSubmit: true})
    // }
console.log(`after all the if statements readyToSubmit: ${readyToSubmit}`);
    // Check that the form has all the required fields and is ready to be submitted
    // if it is then trim the leading and trailing spaces and then submit the form and call submitForm as a callback function so that I know that trimState completed before I submit the form
    // TODO: figure out why the trim function isn't trimming the strings for name, description, and notes
    if (readyToSubmit) {
      this.trimState( this.submitForm()
      )
    }
  } // onSubmit

  submitForm() {
    // Define what happens in this function in each child class
  } // submitForm


  trimState() {
    // NOTE: tried this as well: mystring = mystring.replace(/^\s+|\s+$/g, "");
    // remove leading and trailing white spaces from text fields in state so that they won't interfere with searching later
    // trim white spaces
    console.log('in trimState');
    console.log(this.state.name.length);
    const nameNoSpaces = this.state.name.replace(/^\s+|\s+$/g, "");
    console.log(this.state.name.length);

    this.setState({name: nameNoSpaces});
    const descriptionNoSpaces = this.state.description.trim();
    this.setState({description: descriptionNoSpaces });
    const notesNoSpaces = this.state.notes.trim();
    this.setState({notes: notesNoSpaces });
  } // trimState

  // render the form, and when needed a modal
  render() {

    // generate the HTML option tags for the select field for region
    let regionOptions = this.props.regions.map(region => {
      return <option key={region} value={region}>{region}</option>
    })

    // link all the form fields to the Form components state
    const linked = this.linkAll(); // wrap all state members in links

    // link the name, lat, and lng input feilds in this way so that I can show the user error messages in the form when they try to submit the form without filling out a name, lat, or lng.
    const nameLink = Link.state(this, 'name'),
    nameIsValid = nameLink.value

    const latLink = Link.state(this, 'start_lat'),
    latIsValid = latLink.value

    const lngLink = Link.state(this, 'start_lng'),
    lngIsValid = lngLink.value


    // define these so that I can use them in the if/else statements below for the name, lat, and lng input fields
    let nameBox;
    let latBox;
    let lngBox;
    let modal;

    // only show the form validation message and styling if the user hit submit without entering a name
    if (this.state.nameError) {
      nameBox = <label>
      Name: <Input type="text"
      className={ nameIsValid ? '' : 'invalid'}
      valueLink={ nameLink }
      />
      <div className='error-placeholder'>
      { nameIsValid ? '' : 'Name is required'}
      </div>
      </label>
    } else {
      nameBox = <label>
      Name: <Input type="text" valueLink={ nameLink }
            />
      </label>
    }

    // only show the form validation message and styling if the user hit submit without entering a starting latitude
    if (this.state.latError) {
      latBox = <label>
      Starting latitude: <Input type="number"
      className={ latIsValid ? '' : 'invalid'}
      valueLink={ latLink } />
      <div className='error-placeholder'>
      { latIsValid ? '' : 'Starting latitude is required'}
      </div>
      </label>
    } else {
      latBox = <label>
      Starting latitude: <Input type="number" valueLink={ latLink } />
      </label>
    }

    // only show the form validation message and styling if the user hit submit without entering a starting longitude
    if (this.state.lngError) {
      lngBox = <label>
      Starting longitude: <Input type="number"
      className={ lngIsValid ? '' : 'invalid'}
      valueLink={ lngLink } />
      <div className='error-placeholder'>
      { lngIsValid ? '' : 'Starting longitude is required'}
      </div>
      </label>
    } else {
      lngBox = <label>
      Starting longitude: <Input type="number" valueLink={ lngLink } />
      </label>
    }

    // show the error modal if the post request failed
    // pass the successModal the function to close the AddHikeModal via props (hideFormModal)
    // TODO: figure out how to refactor this to move this logic into Form.js instead
    if (this.state.showErrorModal) {
      modal = <ErrorModal />
    } else if (this.state.showSuccessModal) {
      modal = <SuccessModal hideFormModal={this.props.hideFormModal}/>
    }

    // render the form
    // it used the valueLink library to conect each form input field with the Form components state
    return(
      <div>
      {modal}
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
      Meadows: <Input type="checkbox" valueLink={ linked.meadows} />
      </label>

      <label>
      Old-growth: <Input type="checkbox" valueLink={ linked.old_growth } />
      </label>

      <label>
      Mountain views: <Input type="checkbox" valueLink={ linked.mountain_views } />
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
      </div>
    ) // return

  } // render
} // form

export default BaseForm
