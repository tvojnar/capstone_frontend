// NOTE: I am not using this component in my app

import $ from 'jquery'
import React, { Component } from 'react'

export class ImageInput extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      file:null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

// on change set the file selected by the user to this.state.file
  handleChange(e) {
    console.log('in handleChange');
    // const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9/g,""]/);
    this.setState({file:e.target.files[0]})
  }


  handleSubmit(e) {
    // resources: https://stuff-things.net/2016/03/16/uploading-from-rails-to-aws-s3-with-presigned-urls/
    e.preventDefault();
    console.log('in handle submit');
    console.log(this.state.file);
    console.log(this.state.file.name);

    let file = this.state.file
    // clean the filename to remove any characters that S3 doesn't like
    let cleanFileName = file.name.toLowerCase().replace(/[^a-z0-9/g,""]/);

    const upload_image = function(url) {

        console.log('in upload_image');
        console.log(file);
        console.log(file.type);
        console.log(url);

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // const finalUrl = proxyurl + url


  // THIRD: upload the image file to S3 using the presigned url
        $.ajax({
            type : 'PUT',
            url : url,
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
    }

    // FIRST:  make a call to the rails API (Images#index) to get a presignedUrl from S3
    // const apiUrl = 'http://capstone-env.ejfznpwqha.us-west-2.elasticbeanstalk.com/api/images'
    const apiUrl = 'http://scrappyhikerapi.com/api/images';
    $.getJSON(apiUrl, {filename: file.name, content_type: file.type},
      function(data) {
        console.log('we got the url!');
        console.log(data['url']);
        // SECOND: call upload_image, passing it the presigned url from the rails API
        upload_image(data['url'] )
      }
    ); // getJSON
}
render() {
  return (
  <form className="upload-form">
  <input onChange={this.handleChange} id="image" type="file" name="image" accept="image/x-png, image/gif, image/jpeg" />
  <button onClick={this.handleSubmit} type="submit">Go!</button>
  </form>
)
}
}
