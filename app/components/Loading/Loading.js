import React from 'react';
import PropTypes from 'react-proptypes';
import './Loading.scss';

const Loading = () => {
    return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    )
};

export default Loading;
