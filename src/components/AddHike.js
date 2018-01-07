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
  }

  handleClick() {
    console.log('in handleClick');
    this.setState({showModal: true})

  }

  render() {
    let modal;
    if (this.state.showModal) {
      modal = <AddHikeModal />
    }

    return (
      <div>
        { modal }
        <button onClick={this.handleClick}>AddHike</button>
      </div>
    )
  }

} // AddHike
