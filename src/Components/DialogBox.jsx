import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

function DialogBox({ message, handleCloseModal }) {
  return createPortal(
    <div className="dialog">
      <span>{message}</span>
      <button className="close-btn" type="button" onClick={handleCloseModal}>
        Close
      </button>
    </div>,
    document.querySelector('#dialogbox-portal'),
  );
}

DialogBox.propTypes = {
  message: PropTypes.string,
  handleCloseModal: PropTypes.func,
};

export default DialogBox;
