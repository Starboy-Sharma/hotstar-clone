// @ts-nocheck
import Skeleton from './Skeleton';
import PropTypes from 'prop-types';

function CardSkeleton({ isVisible }) {
  return (
    <div className="tray-container" style={{ marginBottom: '100px', display: isVisible ? 'block' : 'none' }}>
        <div className="title">
          <Skeleton repeatCount={1} isVisible={isVisible} addStyle={{ 'width': '200px' }} />
        </div>
        <div className="movie-card-list" style={{ overflow: 'hidden', height: '300px' }}>
          <Skeleton repeatCount={10} isVisible={isVisible} addStyle={{ 'maxWidth': '236px', 'height': '300px' }} />
        </div>
      </div>
  )
}

CardSkeleton.propTypes = {
  isVisible: PropTypes.bool
}

export default CardSkeleton