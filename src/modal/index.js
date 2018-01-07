import React from 'react';



// import { observerable, action } from 'mobx';
// import { observer } from 'mobx';
// import classNames from 'classnames';
//
// @observer
// class Modal extends React.PureComponent {
//   render() {
//     @observerable isOpen =  false;
//
//     // the open action toggles the state to be open
//     @action open = e => {
//       if (e) { e.preventDefault() }
//
//       this.isOpen = true;
//     } // open
//
//     // the close action toggles the state to be closed
//     @action close = e => {
//       if (e) { e.preventDefault() }
//
//       this.isOpen = false;
//     } // close
//
//     // if this.isOpen is true we render the open class
//     const overlayClasses= classNames({ open: this.isOpen})
//     return (
//       <div id="modal" className={overlayClasses}>
//       </div>
//     ); // return
//   } // render
// } // Modal
//
// export default Modal
