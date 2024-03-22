import PropTypes from "prop-types";

function DialogBox({ message, handleCloseModal }) {
  return (
    <div className="dialog">
      <span>{message}</span>
      <button className="close-btn" type="button" onClick={handleCloseModal}>
        Close
      </button>
    </div>
  );
}

DialogBox.propTypes = {
  message: PropTypes.string,
  handleCloseModal: PropTypes.func,
};

export default DialogBox;
