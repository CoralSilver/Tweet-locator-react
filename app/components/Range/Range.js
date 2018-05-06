import React from 'react';
import PropTypes from 'react-proptypes';
import './Range.scss';

const Range = (props) => {
    return (
        <div className="range">
            <label htmlFor="fader">Distance Range</label>
            <input type="range" className='range__input' min=".5" max="5" value={props.rangeValue} id="fader" step=".25" onChange={props.updateValue}/>
            <output htmlFor="fader" className='range__output'>{props.rangeValue} miles</output>
        </div>
    )
}

Range.propTypes = {
  rangeValue: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired
};

export default Range;
