// @ts-nocheck
import '../../styles/skeleton.css';
import PropTypes from 'prop-types';

function Skeleton({ repeatCount, isVisible, addStyle }) {
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {Array.from({ length: repeatCount }).map((_, index) => (
        <div id="skeleton-loader" key={index}>
          <div className="skeleton skeleton-wrapper" style={addStyle}></div>
        </div>
      ))}
    </>
  );
}

Skeleton.propTypes = {
  repeatCount: PropTypes.number,
  isVisible: PropTypes.bool,
  addStyle: PropTypes.object,
};

export default Skeleton;
