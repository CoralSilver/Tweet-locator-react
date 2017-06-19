import React from 'react';
import PropTypes from 'react-proptypes';
import './Header.scss';
import Button from '../Button/Button';
import locationMarker from 'shared/assets/location-marker.png';

const Header = (props) => (
  <header className="header">
    <img src={locationMarker} alt="logo" className="logo"/>
    <h1>Nearby Tweet Locator</h1>
    <Button
      onClick={props.onClick}
      text={'Log out'}
      />
  </header>
)

Header.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Header;
