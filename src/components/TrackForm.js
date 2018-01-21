import React, { Component } from 'react';
import $ from 'jquery';
import XMLParser from 'react-xml-parser'
import '../foundation.css';
import {Callout, Colors} from 'react-foundation';
import '../App.css';

export class TrackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gpx_file:null,
      trkpt_failed:false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    console.log('in handleChange of TrackForm');
    console.log(e.target.files[0]);
    this.setState({gpx_file:e.target.files[0]})
  } // handleChange


  // xmlToString(xmlData) {
  //
  //     let xmlString;
  //     //IE
  //     if (window.ActiveXObject){
  //         xmlString = xmlData.xml;
  //     }
  //     // code for Mozilla, Firefox, Opera, etc.
  //     else{
  //         xmlString = (new XMLSerializer()).serializeToString(xmlData);
  //     }
  //     return xmlString;
  // }

  handleSubmit(e) {

    e.preventDefault();
    console.log('in handle submit for TrackpointForm');
    console.log(this.state.gpx_file);


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
    readFile(this.state.gpx_file, function(e) {
      submitXml(e.target.result)
    });



    const submitXml = (xml) => {
      let hikeId = this.props.id
      const baseUrl = '/api/hikes/'
      const url = baseUrl + `${hikeId}` + '/trackpoints'


      $.ajax({
        type : "POST",
        url : url,
        // data: {gpx_file: xml, hikeId: hikeId},
        data : xml,
        // dataType: "xml",
        // contentType: "text/xml",
        processData: false,  // tell jQuery not to convert to form data
        // headers: { 'Content-Type': file.type},
        beforeSend: function() {
          this.setState({showLoading: true})
        }.bind(this),
        complete: function() {
          this.setState({showLoading: false})
        }.bind(this),
        success: function(data) {
          console.log('trackpoints uploaded!');
          console.log(data);
          if (data.status == 'all') {
            this.props.fetchHikeDetails();
          } else {
            this.setState({trkpt_failed: true})
          }
        }.bind(this),
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log('Error uploading trackpoints:' + XMLHttpRequest);
          console.log(errorThrown);
          console.log(XMLHttpRequest);
          this.setState({trkpt_failed: true})
        }.bind(this)
      });
    }


    const parseXml = (result) => {
      // const XMLParser = require('react-xml-parser');
      debugger
      const xml = new XMLParser().parseFromString(result);    // Assume xmlText contains the example XML
      console.log(xml);
      console.log('in parseXml');
      // console.log(xml.getElementsByTagName('Name'));
    }
    // let file = {gpx_track: this.state.gpx_file}
    //debugger
    // let file = (new XMLSerializer()).serializeToString(this.state.gpx_track)
    // console.log('file is:');
    // console.log(file);
    // const url = '/api/trackpoints'

    // $.ajax({
    //     type : "POST",
    //     url : url,
    //     data : file,
    //     // dataType: "xml",
    //     // contentType: "text/xml",
    //     processData: false,  // tell jQuery not to convert to form data
    //     // headers: { 'Content-Type': file.type},
    //     success: function(data) {
    //       console.log('trackpoints uploaded!');
    //       console.log(data);
    //     },
    //     error: function (XMLHttpRequest, textStatus, errorThrown) {
    //         console.log('Error uploading trackpoints:' + XMLHttpRequest);
    //         console.log(errorThrown);
    //         console.log(XMLHttpRequest);
    //     }
    // });
  } // handleSubmit

  render() {
    let errorMessage;
    if (this.state.trkpt_failed) {
      errorMessage = <Callout color={Colors.ALERT}>
      <p>Your gps track failed to save</p>
      </Callout>
    } // if

    let loadingMessage;
    if (this.state.showLoading) {
      loadingMessage = <p>loading gps track ...</p>
    } // if
    return (
      <form>
      <p>Upload a gpx track for this hike:</p>
      {errorMessage}
      <input onChange={this.handleChange} id="gpx" type="file" name="gpx"/>
      {loadingMessage}
      <button onClick={this.handleSubmit} type="submit">Go!</button>
      </form>
    )
  }
}