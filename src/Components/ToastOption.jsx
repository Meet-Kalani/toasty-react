import PropTypes from 'prop-types';

function ToastOption({ id, value, handleVariantChange }) {
  return (
    <div className="toast-variant">
      <input type="radio" id={id} value={value} onChange={handleVariantChange} name="toast-variant" />
      <label htmlFor={id}>{value}</label>
    </div>
  );
}

ToastOption.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleVariantChange: PropTypes.func.isRequired,
};

export default ToastOption;
