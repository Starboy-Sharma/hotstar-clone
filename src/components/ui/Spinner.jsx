// @ts-nocheck
import PropTypes from 'prop-types';
import '../../styles/spinner.css';

function Spinner({ text,  isVisible }) {
  return (
    <div className="spinner-overlay" style={{ display: isVisible ? 'block' : 'none' }}>
      <div className="simple-spinner">
        <span></span>
      </div>
        {text && <p>{text}</p>}
    </div>
  );
}

Spinner.propTypes = {
  text: PropTypes.string,
  isVisible: PropTypes.bool
};

export default Spinner;
