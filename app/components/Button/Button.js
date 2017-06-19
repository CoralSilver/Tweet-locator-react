import React from 'react';
import PropTypes from 'react-proptypes';
import './Button.scss';

const Button = (props) => {
    return (
        <button className="btn" onClick={props.onClick}>{props.text}</button>
    )
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
