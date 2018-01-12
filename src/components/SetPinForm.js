import * as React from 'react';
// import $ from 'jquery';

// using valueLink library to connect form fields with the components state. Also used to provide inline error handing for invalid fields in the form
import Link, { LinkedComponent } from 'valuelink';
import { Input } from 'valuelink/tags';

// this is the form that the user can use to enter a name and then have FormContainer do geocoding to get the lat and lng of the hike based on it's name
class SetPinForm extends LinkedComponent {

  constructor(props) {
    super(props);

    // Set the state using the default props
    // later state will be reset when a user types in the input fields
    this.state = this.props.initialState;

    this.trimState = this.trimState.bind(this);
  }

  // default props are used to reset the state to clear the form as well as to set the initialState
  static defaultProps = {
    initialState: {
      name: '',
    }
  }

  // use this function to prepopulate form input fields with the hike's name in EditForm
  // componentWillMount(nextProps) {
  //   if (this.props.hikeName) {
  //     this.setState({name: this.nextProps.hikeName})
  //   }
  // }

  componentWillMount(nextProps) {
    console.log('in CWRP in SetPinForm and detailsToSetPin is:');
    console.log(this.props.detailsToSetPin);
    if (Object.keys(this.props.detailsToSetPin).length !== 0) {
      this.setState({
        name: this.props.detailsToSetPin.name,
        lat: this.props.detailsToSetPin.lat,
        lng: this.props.detailsToSetPin
      })
    }
  }


  // function runs when the submit button is clicked on the form
  onSubmit = e => {
    // prevent the page reloading when the form is submitted
    e.preventDefault();


    // this.state.readyToSubmit is used to determine if there was a name entered before submitting the form
    let readyToSubmit = true


    // check that a name has been entered
    // if not provided by the user then set the state so that the error message and styleing shows up around the  input field in the form. Also set readyToSubmit to false to that the form wont be submitted to the API
    if (this.state.name === '') {
      console.log('in if cause name was missing');
      readyToSubmit = false
      this.setState({nameError: true})
    }  else {
      console.log('ELSE');
      this.setState({nameError: false})
      readyToSubmit =  true;
    } // if/else

    console.log(`after all the if statements readyToSubmit: ${readyToSubmit}`);
    // Check that the form a name before you submite (readyToSubmit = true)
    // if it is then trim the leading and trailing spaces and then submit the form and call submitForm as a callback function so that I know that trimState completed before I submit the form
    // TODO: figure out why the trim function isn't trimming the strings for name, description, and notes
    if (readyToSubmit) {
      this.trimState( this.submitForm()
    )
  }
} // onSubmit

// this will call the setName() function in FormContainer to set the name in state
// in will also result in getCoordinates() function in FormContainer being called, which will set the state of lat and lng in FormContainer and trigger a pin to be rendered on the map and state to be changed in Form.js for the name, start_lat, and start_lng
submitForm() {
  console.log('in submit form and name is: ');
  console.log(this.state.name);
  this.props.setName(this.state.name);
} // submitForm


trimState() {
  // TODO: Add this in once I get it working in BaseForm. Maybe make this function in a module that I can include here as well as in BaseForm?
} // trimState

// render the form
render() {

  // link the name field in this way so that I can show the user error messages in the form when they try to submit the form without filling out a name
  // linking in this way links the input field with state so that when the user types the state for name is updated
  const nameLink = Link.state(this, 'name'),
  nameIsValid = nameLink.value


  // define these so that I can use them in the if/else statements below for the name input field
  let nameBox;


  // only show the form validation message and styling if the user hits submit without entering a name
  // nameIsValid will be false if the user hit submit before entering a name and will become true once the user starts typing in the input field for name
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

  // render the form
  // it used the valueLink library to conect each form input field with the Form components state
  return(
    <form onSubmit={this.onSubmit}>

      { nameBox }

      <button type='submit'>Set pin</button>

    </form>
  ) // return

} // render
} // form

export default SetPinForm
