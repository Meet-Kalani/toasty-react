import {
  FiTool,
  FiAlertTriangle,
  FiCheckCircle,
  FiAlertOctagon,
  FiXCircle,
} from "react-icons/fi";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Toast({ message, handleMessageRemove }) {
  const ref = useRef(null);

  useEffect(() => {
    let timeoutIdForAnimation;

    const timeoutIdForRemoval = setTimeout(() => {
      ref.current.classList = "toast slide-out-animation";

      timeoutIdForAnimation = setTimeout(() => {
        handleMessageRemove(message.id);
      }, 450);
    }, 7000);

    return () => {
      clearTimeout(timeoutIdForRemoval);
      clearTimeout(timeoutIdForAnimation);
    };
  }, []);

  const styles = {};

  const toastIcon = () => {
    if (message.toastType === "notice") {
      styles.backgroundColor = "#D69AFF";
      return <FiAlertOctagon className="toast-icon" />;
    } else if (message.toastType === "warning") {
      styles.backgroundColor = "#CECE4A";
      return <FiTool className="toast-icon" />;
    } else if (message.toastType === "success") {
      styles.backgroundColor = "#5FD65F";
      return <FiCheckCircle className="toast-icon" />;
    } else if (message.toastType === "error") {
      styles.backgroundColor = "#BB4D4D";
      return <FiAlertTriangle className="toast-icon" />;
    }
    return;
  };

  return (
    <div className="toast slide-in-animation" style={styles} ref={ref}>
      <div className="toast-icon-container">{toastIcon()}</div>
      <div className="message-container">
        {message.message}
      </div>
      <span
        className="close-btn"
        onClick={() => {
          ref.current.classList = "toast slide-out-animation";
          setTimeout(() => {
            handleMessageRemove(message.id);
          }, 450);
        }}
      >
        <FiXCircle />
      </span>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.object,
  handleMessageRemove: PropTypes.func,
};

export default Toast;
