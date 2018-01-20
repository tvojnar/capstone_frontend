import React, { Component } from 'react';
import $ from 'jquery';

export class TrackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file:null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log('in handleChange of TrackForm');
    console.log(e.target.files[0]);
    this.setState({file:e.target.files[0]})
  } // handleChange


  handleSubmit(e) {

    e.preventDefault();
    console.log('in handle submit for TrackpointForm');
    console.log(this.state.file);
    console.log(this.state.file.name);

    let file = this.state.file
    const url = '/api/trackpoints'

        $.ajax({
            type : "POST",
            url : url,
            data : file,
            processData: false,  // tell jQuery not to convert to form data
            headers: { 'Content-Type': file.type},
            success: function(data) {
              console.log('trackpoints uploaded!');
              console.log(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('Error uploading trackpoints:' + XMLHttpRequest);
                console.log(errorThrown);
                console.log(XMLHttpRequest);
            }
        });
} // handleSubmit

  render() {
    return (
      <form>
      <p>Upload a gpx track for this hike:</p>
      <input onChange={this.handleChange} id="gpx" type="file" name="gpx"/>
      <button onClick={this.handleSubmit} type="submit">Go!</button>
      </form>
    )
  }
}
