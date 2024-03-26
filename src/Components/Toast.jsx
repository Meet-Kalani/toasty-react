import {
  FiTool,
  FiAlertTriangle,
  FiCheckCircle,
  FiAlertOctagon,
  FiXCircle,
  FiAlertCircle
} from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

function Toast({ message, handleMessageRemove }) {
  const [slideOut, setSlideOut] = useState(false); // state for tracking slide out animation

  useEffect(() => {
    let timeoutIdForAnimation;

    const timeoutIdForRemoval = setTimeout(() => {
      setSlideOut(true);

      timeoutIdForAnimation = setTimeout(() => {
        handleMessageRemove(message.id);
      }, 450);
    }, 7000);

    return () => {
      clearTimeout(timeoutIdForRemoval);
      clearTimeout(timeoutIdForAnimation);
    };
  }, [handleMessageRemove, message.id]);

  const styles = {};

  const handleCloseBtn = useCallback(() => {
    setSlideOut(true);
    setTimeout(() => {
      handleMessageRemove(message.id);
    }, 450);
  }, [message.id, handleMessageRemove]);

  const toastIcon = () => {
    const iconMap = {
      notice: {
        icon: <FiAlertOctagon className="toast-icon" />,
        backgroundColor: "#D69AFF",
      },
      warning: {
        icon: <FiTool className="toast-icon" />,
        backgroundColor: "#CECE4A",
      },
      success: {
        icon: <FiCheckCircle className="toast-icon" />,
        backgroundColor: "#5FD65F",
      },
      error: {
        icon: <FiAlertTriangle className="toast-icon" />,
        backgroundColor: "#BB4D4D",
      },
      default: {
        icon: <FiAlertCircle className="toast-icon" />,
        backgroundColor: "#333",
      },
    };

    const { icon, backgroundColor } =
      iconMap[message.toastType] || iconMap.default;

    styles.backgroundColor = backgroundColor;
    return icon;
  };

  return (
    <div
      className={
        slideOut ? "toast slide-out-animation" : "toast slide-in-animation"
      }
      style={styles}
    >
      <div className="toast-icon-container">{toastIcon()}</div>
      <div className="message-container">{message.message}</div>
      <span className="close-btn" onClick={handleCloseBtn}>
        <FiXCircle />
      </span>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string,
    toastType: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  handleMessageRemove: PropTypes.func.isRequired,
};

export default Toast;
