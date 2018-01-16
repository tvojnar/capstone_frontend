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
    this.setState({file:e.target.files[0]})
  }


  handleSubmit(e) {
    e.preventDefault();
    console.log('in handle submit');
    console.log(this.state.file);
    console.log(this.state.file.name);

    let file = this.state.file
    const url = '/api/images'

    const upload_image = function(url) {

        console.log('in upload_image');
        console.log(file);
        console.log(file.type);
        console.log(url);


  // THIRD: upload the image file to S3 using the presigned url
        $.ajax({
            type : 'PUT',
            url : url,
            data : file,
            processData: false,  // tell jQuery not to convert to form data
            contentType: file.type,
            success: function(json) { console.log('Upload complete!') },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('Upload error: ' + XMLHttpRequest);
                console.log(errorThrown);
                console.log(XMLHttpRequest);
            }
        });
    }

    // FIRST:  make a call to the rails API (Images#index) to get a presignedUrl from S3
    $.getJSON(url, {filename: file.name},
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
