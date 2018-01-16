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

    $.getJSON(url, {filename: file.name},
      function(data) {
        console.log('we got the url!');
        console.log(data['url']);
      }
    ); // getJSON

  //   let form = this;
  //   let field = $(this).find('input[name=image]');
  //   let file = field[0].files[0];
  //
  //   $.getJSON('/sign/presign_url.json',
  //   {filename: file.name},
  //   function(data) {
  //     upload_image(form,data['url']);
  //   }
  // );
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
