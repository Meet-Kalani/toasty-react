import { useState } from "react";
import PropTypes from "prop-types";
import DialogBox from "./DialogBox";

function UserInput({ handleNewMessage }) {
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!toastType || !message.trim()) {
      setIsModalOpen(true);
      setMessage(message.trim());
      return;
    }

    handleNewMessage(message, toastType);
    setMessage("");
  };

  const handleVariantChange = (e) => {
    setToastType(e.target.value);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="user-input-form">
        {isModalOpen && (
          <DialogBox
            message={
              "Error: Unable to proceed. Please enter a message and select a toast type before proceeding."
            }
            handleCloseModal={handleCloseModal}
          />
        )}
        <div className="user-input-container">
          <label htmlFor="message" className="user-input-title">
            Message
          </label>
          <input
            className="user-input"
            type="text"
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            disabled={isModalOpen}
          />
        </div>
        <div className="toast-variants-container">
          <label className="toast-variants-title">Toast Variant</label>
          <div className="toast-variants">
            <div className="toast-variant">
              <input
                type="radio"
                id="notice-variant"
                value="notice"
                onChange={handleVariantChange}
                name="toast-variant"
              />
              <label htmlFor="notice-variant">notice</label>
            </div>
            <div className="toast-variant">
              <input
                type="radio"
                id="warning-variant"
                value="warning"
                onChange={handleVariantChange}
                name="toast-variant"
              />
              <label htmlFor="warning-variant">warning</label>
            </div>
            <div className="toast-variant">
              <input
                type="radio"
                id="success-variant"
                value="success"
                onChange={handleVariantChange}
                name="toast-variant"
              />
              <label htmlFor="success-variant">success</label>
            </div>
            <div className="toast-variant">
              <input
                type="radio"
                id="error-variant"
                value="error"
                onChange={handleVariantChange}
                name="toast-variant"
              />
              <label htmlFor="error-variant">error</label>
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className="toast-btn" disabled={isModalOpen}>
            Toast
          </button>
        </div>
      </form>
    </>
  );
}

UserInput.propTypes = {
  handleNewMessage: PropTypes.func,
};

export default UserInput;
