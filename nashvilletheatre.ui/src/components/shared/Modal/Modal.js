import React from 'react';
import { Link } from 'react-router-dom'

import './Modal.scss';

class Modal extends React.Component {

	render() {

		return (
			<div className="modal-modal" onClick={()=> {}}>
				<div className="modal-box">
          <Link id="close-modal" onClick={()=> {}}>X</Link>
          <h1>Hello World</h1>
        </div>
			</div>
		);
	}
}

export default Modal;