import React, { Component } from 'react';
import AddHikeModal from '../modal/AddHikeModal';

export class AddHike extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: true,
      showModal: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
  }

  handleClick() {
    console.log('in handleClick');
    this.setState({showModal: true})

  }

  handleHideModal() {
    console.log('in handleHideModal');
    this.setState({showModal: false})
  }

  render() {
    // pass AddHikeModal the function to close the modal via props (hideModalFromAddHike)
    let modal;
    if (this.state.showModal) {
      modal = <AddHikeModal hideModalFromAddHike={this.handleHideModal} />
    }


    return (
      <div>
        { modal }
        <button className='button' onClick={this.handleClick}>AddHike</button>
      </div>
    )
  }

} // AddHike
