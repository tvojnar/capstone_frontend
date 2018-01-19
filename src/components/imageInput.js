
import $ from 'jquery'
import React, { Component } from 'react'
import {ImageNameContainer} from '../containers/ImageNameContainer';

export class ImageInput extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      file:null,
      presignedUrl:'',
    }

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.upload_image = this.upload_image.bind(this);
    this.generatePresignedUrl = this.generatePresignedUrl.bind(this);
  }

// on change set the file selected by the user to this.state.file
  handleChange(e) {
    console.log('in handleChange');
    console.log(e.target.files[0].name);
    // const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9/g,""]/);
    const file = e.target.files[0];
    this.setState({file:e.target.files[0]})
    this.generatePresignedUrl(file);
  } // handleChange

  generatePresignedUrl(file) {

        // generate a presignedUrl by making an api call to the backend

        console.log('in generatePresignedUrl and file is: ');
        console.log(file);
        // clean the filename to remove any characters that S3 doesn't like
        let cleanFileName = file.name.toLowerCase().replace(/[^a-z0-9/g,""]/);

        const add_url_to_state = (presignedUrl) => {
          this.setState({presignedUrl: presignedUrl})
          console.log('after setState presignedUrl is:');
          console.log(this.state.presignedUrl);
        }

        // FIRST:  make a call to the rails API (Images#index) to get a presignedUrl from S3
        const apiUrl = '/api/images'

        $.getJSON(apiUrl, {filename: file.name, content_type: file.type},
          function(data) {
            console.log('we got the url!');
            console.log(data['url']);
            // SECOND: call upload_image, passing it the presigned url from the rails API
            // upload_image(data['url'] )
            // add_file_and_url_to_state(data['url']);

            // add the presigned url to state
            add_url_to_state(data['url'] )
          }
        ); // getJSON
  }

  upload_image(url) {
      console.log('in upload_image');
      const file = this.state.file;

// THIRD: upload the image file to S3 using the presigned url
      $.ajax({
          type : 'PUT',
          url : this.state.presignedUrl,
          data : file,
          processData: false,  // tell jQuery not to convert to form data
          // headers: { 'Content-Type': file.type, 'x-amz-acl': 'public-read' },
          headers: { 'Content-Type': file.type},
          success: function(json) { console.log('Upload complete!') },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log('Upload error: ' + XMLHttpRequest);
              console.log(errorThrown);
              console.log(XMLHttpRequest);
          }
      });
  } // upload_image



//   handleSubmit(e) {
//     // resources: https://stuff-things.net/2016/03/16/uploading-from-rails-to-aws-s3-with-presigned-urls/
//     e.preventDefault();
//     console.log('in handle submit');
//     console.log(this.state.file);
//     console.log(this.state.file.name);
//
//     let file = this.state.file
//     // clean the filename to remove any characters that S3 doesn't like
//     let cleanFileName = file.name.toLowerCase().replace(/[^a-z0-9/g,""]/);
//
//
// // NOTE: if I'm trying to upload multiple images at once:
//     // const add_file_and_url_to_state = (presignedUrl) => {
//     //   console.log('in add_file_and_url_to_state');
//     //   // make an array with the presignedUrl passed from the $.getJSON below and the current file that is selected
//     //   const urlFileArray = [presignedUrl, this.state.file]
//     //   // append this array onto this.state.urlsAndFiles
//     //   this.setState({ urlsAndFiles: [...this.state.urlsAndFiles, ...urlFileArray ] })
//     //   console.log(this.state.urlsAndFiles);
//     // } // add_file_and_url_to_state
//
//     const add_url_to_state = (presignedUrl) => {
//       this.setState({presignedUrl: presignedUrl})
//     }
//
//     // FIRST:  make a call to the rails API (Images#index) to get a presignedUrl from S3
//     const apiUrl = '/api/images'
//
//     $.getJSON(apiUrl, {filename: file.name, content_type: file.type},
//       function(data) {
//         console.log('we got the url!');
//         console.log(data['url']);
//         // SECOND: call upload_image, passing it the presigned url from the rails API
//         // upload_image(data['url'] )
//         // add_file_and_url_to_state(data['url']);
//
//         // add the presigned url to state
//         add_url_to_state(data['url'] )
//       }
//     ); // getJSON
// } // handleSubmit


render() {
  return (
  <form className="upload-form">
  <input onChange={this.handleChange} id="image" type="file" name="image" accept="image/x-png, image/gif, image/jpeg" />
  <ImageNameContainer imageInfo={this.state.imageNames} />
  <button onClick={this.handleSubmit} type="submit">Go!</button>
  </form>
)
}
}
