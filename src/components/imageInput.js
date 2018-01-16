import $ from 'jquery'
import React, { Component } from 'react'

export class ImageInput extends Component {
  constructor(props) {
    super(props) ;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('in handle submit');
    // let form = this;
    // let field = $(this).find('input[name=image]');
    // let file = field[0].files[0];
    //
    // $.getJSON('/sign/presign_url.json',
    // {filename: file.name},
    // function(data) {
    //   upload_image(form,data['url']);
  //   }
  // );
}
render() {
  return (
  <form class="upload-form">
  <input id="image" type="file" name="image" accept="image/x-png, image/gif, image/jpeg" />
  <button onClick={this.handleSubmit} type="submit">Go!</button>
  </form>
)
}
}
