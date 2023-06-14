import React from 'react';
import PropTypes from 'prop-types';

const DestinyToggle = ({ isDestiny, onToggle }) => {
  const handleToggle = () => {
    onToggle(!isDestiny);
  };

  return (
    <div>
      <label htmlFor="toggle" className="switch">
        <input
          id="toggle"
          type="checkbox"
          checked={isDestiny}
          onChange={handleToggle}
        />
        <span className="slider round" />
      </label>
    </div>
  );
};

DestinyToggle.propTypes = {
  isDestiny: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default DestinyToggle;
