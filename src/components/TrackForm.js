import React, { Component } from 'react';
import $ from 'jquery';
import XMLParser from 'react-xml-parser'
import '../foundation.css';
import {Callout, Colors, Button, Link, Sizes} from 'react-foundation';
import '../App.css';

export class TrackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gpx_file:null,
      trkpt_failed: false,
      uploadWarning: false,
      successfulPost: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleCloseUploadWarning = this.handleCloseUploadWarning.bind(this);
    this.handleCloseFailure = this.handleCloseFailure.bind(this);
    this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
  }


// removes the success message when a track saved to the api
handleCloseSuccess() {
  this.setState({successfulPost: false})
}
// removes the error message for when a track fails to save to the api
  handleCloseFailure() {
    this.setState({trkpt_failed: false})
  }

// removes the warning message for when a user clicks upload before selecting a track
  handleCloseUploadWarning() {
    this.setState({uploadWarning: false})
  }

// sets this.state.file to the file the user selected in the form
  handleChange(e) {
    console.log('in handleChange of TrackForm');
    console.log(e.target.files[0]);
    this.setState({gpx_file:e.target.files[0]})
  } // handleChange


  // submit the xml data from the form to the api when the 'upload track' button is clicked
  handleSubmit(e) {

    // prevent the default behavior of the page reloading
    e.preventDefault();
    console.log('in handle submit for TrackpointForm');
    console.log(this.state.gpx_file);

    // check that a file was selected before reading the file and posting the files content to the api
    if (this.state.gpx_file) {

      // readFile is a function that will read the gpx_file that the user uploaded so that I can access the xml that is within the file.
      // the xml will be passed to the callback function where I will be able to access it via e.target.result
      const readFile = (file, callback) => {
        var reader = new FileReader()
        reader.onloadstart = (file) => {
          console.log("reading started")
        }

        reader.onloadend = (file) => {
          console.log("reading ended")
          // NOTE: this.result is the xml i want
        }

        reader.onload = callback
        reader.readAsText(this.state.gpx_file)
      }

      // readFile will be called and passed the gpx file. The callback function to readFile will call submitXml, which will make an api call to post the xml from the file (as a string) to the api. Then in the API I will use nokogiri to parse the xml to get the data I need out of it
      // e.target.result is the xml from the file in a string
      readFile(this.state.gpx_file, function(e) {
        submitXml(e.target.result)
      });


      // function to submit the xml data from the file to the API
      // submitXml is the callback function to readFile
      const submitXml = (xml) => {
        // get the hike id that was passed via props from HikeDetails modal
        let hikeId = this.props.id
        // since I am using a nested rout on the backend the url is '/api/hikes/:hike_id/trackpoints'
        // I am making the url in this way because I can only get my post to work when i send 'data: xml' and if I do 'data: {gpx_file: xml, id: hikeId}' it doesn't work, so I am using a nested route in my api for trackpoints#create so that I can send the hikeId in the url to the API instead
        const baseUrl = 'scrappyhikerapi.com/api/hikes';
        // const baseUrl = '/api/hikes/'
        const url = baseUrl + `${hikeId}` + '/trackpoints'

        // make a post request with the xml from the file
        $.ajax({
          type : "POST",
          url : url,
          data : xml,
          processData: false,  // tell jQuery not to convert to form data
          beforeSend: function() {
            // change the state so that the loading message will show up and all previous error and warning messages dissapear
            this.setState({
              showLoading: true,
              uploadWarning: false,
              trkpt_failed: false
              })
          }.bind(this),
          complete: function() {
            // change the state so that the loading message is removed from the page
            this.setState({showLoading: false})
          }.bind(this),
          success: function(data) {
            console.log('trackpoints uploaded!');
            console.log(data);
            if (data.status == 'all') {
                  // if the api call was a success and the api was able to create all of the trackpoints in the xml file then call a function so that the HikeDetailsModal will fetch the hikes details from the API again so that it will now have all of the trackpoints of the hike so that they can be displayed on the map
              this.setState({successfulPost: true})
              this.props.fetchHikeDetails();
            } else {
              // if the trackpoints did not all save then tell the user that the upload failed
              this.setState({trkpt_failed: true})
            }
          }.bind(this),
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('Error uploading trackpoints:' + XMLHttpRequest);
            console.log(errorThrown);
            console.log(XMLHttpRequest);
            // if the api post failed then report that the upload failed to the user
            this.setState({trkpt_failed: true})
          }.bind(this)
        }); // ajax
      } // submitXml
    } // if

    if (this.state.gpx_file === null) {
      // if the user hit upload without first selecting a file, change the state so that a warning message is shown to them that they need to choose a file before uploading
      console.log('in if in submit');
      this.setState({uploadWarning: true})
    } // if
  } // handleSubmit

  render() {
    // if the api request failed or if all the trackpoints from the file were not created by the api then show them an error message
    let errorMessage;
    if (this.state.trkpt_failed) {
      errorMessage = <Callout color={Colors.ALERT}>
      <p>Your gps track failed to save</p>
      <Link size={Sizes.TINY} onClick={this.handleCloseFailure}>Close</Link>
      </Callout>
    } // if

    // show a message telling the user that the track is loading while the POST request is processing
    let loadingMessage;
    if (this.state.showLoading) {
      loadingMessage = <Callout color={Colors.PRIMARY}>
      <p>Loading your gpx track ...</p>
      </Callout>
    } // if

  // if the user hit upload without first selecting a file, show them an error message that they need to choose a file before uploading
    let uploadMessage;
    if (this.state.uploadWarning) {
      uploadMessage =
      <Callout color={Colors.WARNING}>
      <p>Please choose a gpx track before uploading!</p>
      <Link size={Sizes.TINY} onClick={this.handleCloseUploadWarning}>Close</Link>
      </Callout>
    }

    // if the upload of the gpx track was successful then show the user a success message
      let successMessage;
      if (this.state.successfulPost) {
        successMessage =
        <Callout color={Colors.SUCCESS}>
        <p>Your gpx track was successfully saved!</p>
        <Link size={Sizes.TINY} onClick={this.handleCloseSuccess}>Close</Link>
        </Callout>
      }

    return (
      <div className='importFile'>
        <form>
          <label><strong>Upload a gpx track for this hike:</strong>
          {errorMessage}
          <input onChange={this.handleChange} id="gpx" type="file" name="gpx" accept=".gpx"/>
          </label>
          {loadingMessage}
          {uploadMessage}
          <Button className='blueButton' onClick={this.handleSubmit} type="submit">Upload track</Button>
        </form>
      </div>
    )
  }
}
