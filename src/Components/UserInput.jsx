import { useState } from "react";
import PropTypes from "prop-types";
import DialogBox from "./DialogBox";
import ToastOption from "./ToastOption";

function UserInput({ handleNewMessage }) {
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toastVariants = [
    {
      id: "notice-variant",
      value: "notice",
    },
    {
      id: "warning-variant",
      value: "warning",
    },
    {
      id: "success-variant",
      value: "success",
    },
    {
      id: "error-variant",
      value: "error",
    },
  ];

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
            {toastVariants.map((toastVariant) => {
              return (
                <ToastOption
                  key={toastVariant.id}
                  id={toastVariant.id}
                  value={toastVariant.value}
                  handleVariantChange={handleVariantChange}
                />
              );
            })}
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
