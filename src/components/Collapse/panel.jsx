import React from 'react';
import PropTypes from "prop-types";
function Panel(props) {
    return (
        <div></div>
    )
}

Panel.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType
    ]),
    key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}
