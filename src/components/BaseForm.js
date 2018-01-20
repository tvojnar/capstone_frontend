 import * as React from 'react';
import $ from 'jquery'
import '../foundation.css';
import {Button, Colors, Row, Column, Callout} from 'react-foundation';
import '../App.css';
// import $ from 'jquery';


// import modals to show sucess or error message after post request to add a new hike

// TODO
import ErrorModal from '../modal/ErrorModal'
import SuccessModal from '../modal/SuccessModal'


// using valueLink library to connect form fields with the components state. Also used to provide inline error handing for invalid fields in the form
import Link, { LinkedComponent } from 'valuelink';
import { Input } from 'valuelink/tags';
import { Select } from 'valuelink/tags';

// this is the base class for Form and EditForm
class BaseForm extends LinkedComponent {

  constructor(props) {
    super(props);

    // Set the state using the default props
    this.state = this.props.initialState;

    this.trimState = this.trimState.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
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
      submitError: false,
      submitErrorMessage: 'Submit failed: Please set a pin for the hike',
    }
  }

  // upload
  handleImageUpload(e) {
    // resources: https://stuff-things.net/2016/03/16/uploading-from-rails-to-aws-s3-with-presigned-urls/
    console.log('in handleImageUpload');
    console.log(e.target.files[0]);

    // pull the file out of the form
    let file = e.target.files[0]
    // clean the filename to remove any characters that S3 doesn't like
    // let cleanFileName = file.name.toLowerCase().replace(/[^a-z0-9/g,""]/);

    const setUrlToState = (fileName) => {
      console.log('in setUrlToState');
      this.setState({image_url: fileName})
    }

    const upload_image = function(presignedUrl, fileName) {
        console.log('in upload_image');
        console.log(presignedUrl);

  // THIRD: upload the image file to S3 using the presigned url
        $.ajax({
            type : 'PUT',
            url : presignedUrl,
            data : file,
            processData: false,  // tell jQuery not to convert to form data
            // headers: { 'Content-Type': file.type, 'x-amz-acl': 'public-read' },
            headers: { 'Content-Type': file.type},
            success: function(data) {
              console.log('Upload complete!')
              const baseImageUrl = 'https://s3-us-west-2.amazonaws.com/tv-capstone/';
              let imageUrl = baseImageUrl + fileName;
              // imageUrl = imageUrl.replace(/[\s+,"+"]/);
              console.log(imageUrl);
              setUrlToState(imageUrl);
            }.bind(this),
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('Upload error: ' + XMLHttpRequest);
                console.log(errorThrown);
                console.log(XMLHttpRequest);
            }
        });
    }

    // FIRST:  make a call to the rails API (Images#index) to get a presignedUrl from S3
    const apiUrl = '/api/images'

    $.getJSON(apiUrl, {filename: file.name, content_type: file.type},
      function(data) {
        console.log('we got the url!');
        console.log(data['fileName']);
        console.log(data['url']);
        // SECOND: call upload_image, passing it the presigned url from the rails API
        upload_image(data['url'], data['fileName'])
      }
    ); // getJSON
  } // handleImageUpload

  // use this function to prepopulate form input fields with the hike's data in EditForm via props passed in from the parent component of EditForm
  componentDidMount() {
    console.log('in CDM of BaseForm');
    if (this.props.hikeState) {
      this.setState(this.props.hikeState)
    }
  }

  componentWillReceiveProps(nextProps) {
    // once the user has entered name in SetPinForm or name/lat/lng in LatLngSetPinForm and enteredName === true then the name, start_latm and start_lng will be set in Form via props passed from FormContainer
    // if the user enters a name that does not get any results from the geocoding api then the state for name, start_lat and start_lng will be set back to ''
    console.log('in Form CWRP');
    console.log(nextProps.hikeName);
    console.log(nextProps.hikeLat);
    console.log(nextProps.hikeLng);
    if (nextProps.nameEntered) {
      this.setState({name: nextProps.hikeName})
      this.setState({start_lat: nextProps.hikeLat})
      this.setState({start_lng: nextProps.hikeLng})
    } else {
      this.setState({name: ''})
      this.setState({start_lat: ''})
      this.setState({start_lng: ''})
    }
  }



  // function runs when the submit button is clicked on the form
  onSubmit = e => {
    // NOTE: rails will automatically convert string numbers into floats or intergers depending on the data type for the column that data is being added to. It will also reformat dates if they are in year-month-date format ("2018-01-09")


    // prevent the page reloading when the form is submitted
    e.preventDefault();


    // this.state.readyToSubmit is used to determine if there are missing fields in the form or if the form is ready to be submitted to the API
    let readyToSubmit = true
    console.log(`before all the if statements readyToSubmit: ${readyToSubmit}`);


    // check that a name, staring lat and starting lng have been entered
    // TODO: Figure out a new way to display error messages to the user when these forms aren't populated. They are populated via user input in SetPinForm and LatLngSetPinForm, which have validations. So I should not let this form be submitted until nameEntered === true or something like that. I need to think about the best way to do this.
    if (this.state.name === '' || this.state.start_lat === '' || this.state.start_lng === '') {
      readyToSubmit = false

    } else {
      console.log('ELSE');
      readyToSubmit =  true;
    }

    console.log(`after all the if statements readyToSubmit: ${readyToSubmit}`);
    // Check that the form has all the required fields and is ready to be submitted
    // if it is then trim the leading and trailing spaces and then submit the form and call submitForm as a callback function so that I know that trimState completed before I submit the form
    // TODO: figure out why the trim function isn't trimming the strings for name, description, and notes
    if (readyToSubmit) {
      // set submitError to false so that NO error message is displayed to the user
      this.setState({
        submitError: false,
      })
      this.trimState( this.submitForm() )
  } else {
      // set submitError to true so that the user is informed that they need to set a pin for the hike before submitting the form
      this.setState({
        submitError: true,
      })
    } // if/else
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
  console.log('in BaseForm render and name is');
  console.log(this.state.name);

  // generate the HTML option tags for the select field for region
  let regionOptions = this.props.regions.map(region => {
    return <option key={region} value={region}>{region}</option>
  })

  // link all the form fields to the Form components state
  const linked = this.linkAll(); // wrap all state members in links

  // link the name, lat, and lng input feilds in this way so that I can show the user error messages in the form when they try to submit the form without filling out a name, lat, or lng.
  const nameLink = Link.state(this, 'name')


  const latLink = Link.state(this, 'start_lat')


  const lngLink = Link.state(this, 'start_lng')



  // define these so that I can use them in the if/else statements below for the name, lat, and lng input fields
  let modal;


  // show the error modal if the post request failed
  // pass the successModal the function to close the AddHikeModal via props (hideFormModal)
  // TODO: figure out how to refactor this to move this logic into Form.js instead
  if (this.state.showErrorModal) {
    modal = <ErrorModal hideFormModal={this.props.hideFormModal}/>
  } else if (this.state.showSuccessModal) {
    modal = <SuccessModal hideFormModal={this.props.hideFormModal}/>
  }

  let errorOnSubmitMessage;
  if (this.state.submitError) {
    errorOnSubmitMessage = <Callout color={Colors.ALERT}>
    <p>{this.state.submitErrorMessage}</p>
    </Callout>

  }
  // render the form
  // it used the valueLink library to conect each form input field with the Form components state
  return(
    <div>
    {modal}

    <form onSubmit={this.onSubmit}>
    <div class='hikeAttributes'>
    <Row upOnSmall={1} upOnMedium={2} upOnLarge={6}>
    <Column isColumn>
    <label>
    Region: <Select valueLink={ linked.region }>{regionOptions}</Select>
    </label>
    </Column>

    <Column isColumn>
    <label className='attributeLabel'>
    Start date: <Input type="date" valueLink={ linked.start_date } />
    </label>
    </Column>

    <Column isColumn>
    <label className='attributeLabel'>
    End date: <Input type="date" valueLink={ linked.end_date } />
    </label>
    </Column>

    <Column isColumn>
    <label className='attributeLabel'>
    Miles: <Input type="number" valueLink={ linked.miles } />
    </label>
    </Column>

    <Column isColumn>
    <label className='attributeLabel'>
    Elevation gain: <Input type="number" valueLink={ linked.elevation_gain } />
    </label>
    </Column>

    <Column isColumn>
    <label className='attributeLabel'>
    Max elevation: <Input type="number" valueLink={ linked.max_elevation } />
    </label>
    </Column>
    </Row>
    </div>

    <label className='attributeLabel'>
    Description: <Input style={{ minHeight: 40, minWidth: '100%' }} valueLink={ linked.description } />
    </label>


    <label>
    Notes: <Input style={{ minHeight: 40, minWidth: '100%' }} valueLink={ linked.notes } />
    </label>


    <Row upOnSmall={2} upOnMedium={4} upOnLarge={6}>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.lakes } /> Lakes
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.coast } /> Coast
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.rivers } /> Rivers
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.waterfalls } /> Waterfalls
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.fall_foliage } />Fall foliage
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.wildflowers } /> Wildflowers
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.meadows} />Meadows
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.old_growth } />Old-growth
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.mountain_views } /> Mountain views
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.summits } /> Summits
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.established_campsites } /> Campsites
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.day_hike } /> Day hike
        </label>

      </Column>
      <Column isColumn>

        <label>
        <Input type="checkbox" valueLink={ linked.overnight } />  Overnight
        </label>

      </Column>
    </Row>
    <p><strong>Add cover image for your hike:</strong></p>
    <input classname='imageButton' onChange={this.handleImageUpload} id="image" type="file" name="image" accept="image/x-png, image/gif, image/jpeg" />
    {errorOnSubmitMessage}
    <Button className='greenButton hoverGrey' type='submit'>Submit</Button>
    </form>
    </div>
  ) // return

} // render
} // form

export default BaseForm
