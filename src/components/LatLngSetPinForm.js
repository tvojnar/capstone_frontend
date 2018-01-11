import * as React from 'react';
// import $ from 'jquery';

// using valueLink library to connect form fields with the components state. Also used to provide inline error handing for invalid fields in the form
import Link, { LinkedComponent } from 'valuelink';
import { Input } from 'valuelink/tags';


class LatLngSetPinForm extends LinkedComponent {

  constructor(props) {
    super(props);

    // Set the state using the default props
    this.state = this.props.initialState;

    this.trimState = this.trimState.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  // default props are used to reset the state to clear the form as well as to set the initialState
  static defaultProps = {
    initialState: {
      lat: '',
      lng: '',
      name: '',
    }
  }

  // use this function to prepopulate form input fields with the hike's name in EditForm
  componentWillMount(nextProps) {
    if (this.props.hikeName) {
      this.setState({
        lat: this.props.hikeLat,
        lng: this.state.hikeLng})
    }
  }



  // function runs when the submit button is clicked on the form
  onSubmit = e => {
    // prevent the page reloading when the form is submitted
    e.preventDefault();


    // this.state.readyToSubmit is used to determine if there was a name entered before
    let readyToSubmit = true


    // check that a name has been entered
    // if not provided by the user then set the state so that the error message and styleing shows up around the  input field in the form. Also set readyToSubmit to false to that the form wont be submitted to the API
    if (this.state.start_lat === '' || this.state.start_lng === '') {
      console.log('in if cause something was missing');
      readyToSubmit = false


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

    console.log(`after all the if statements readyToSubmit: ${readyToSubmit}`);
    // Check that the form a name before you submite (readyToSubmit = true)
    // if it is then trim the leading and trailing spaces and then submit the form and call submitForm as a callback function so that I know that trimState completed before I submit the form
    // TODO: figure out why the trim function isn't trimming the strings for name, description, and notes
    if (readyToSubmit) {
      this.trimState( this.submitForm()
    )
  }
} // onSubmit

// this will call a function in FormContainer to set the name in state
// in will also result in getCoordinates being called, which will set the state of lat and lng in FormContainer
submitForm() {
  console.log('in LatLngSetPinForm submitform and name, lat and lng are: ');
  console.log(this.state.name);
  console.log(this.state.lat);
  console.log(this.state.lng);
  this.props.setLatLng(this.state.name, this.state.lat, this.state.lng);
} // submitForm


trimState() {
  // Add this in once I get it working in BaseForm. Maybe make this function in a module that I can include here as well as in BaseForm?
} // trimState

// render the form, and when needed a modal
render() {


  // link the name field in this way so that I can show the user error messages in the form when they try to submit the form without filling out a name
  const nameLink = Link.state(this, 'name'),
  nameIsValid = nameLink.value

  const latLink = Link.state(this, 'lat'),
  latIsValid = latLink.value

  const lngLink = Link.state(this, 'lng'),
  lngIsValid = lngLink.value


  // define these so that I can use them in the if/else statements below for the lat, and lng input fields
  let latBox;
  let lngBox;
  let nameBox;

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


  // render the form
  // it used the valueLink library to conect each form input field with the Form components state
  return(
    <form onSubmit={this.onSubmit}>
      { nameBox }
      { latBox }
      { lngBox }

      <button type='submit'>Set pin</button>

    </form>
  ) // return

} // render
} // form

export default LatLngSetPinForm
