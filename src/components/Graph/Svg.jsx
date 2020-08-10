import React from 'react';
// svg基础组件
function Svg (props) {
    // let { width, height, viewBox, fill, stroke, strokeWidth, strokeDasharray } = props;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            {...props}
            version="1.1"
        >
            {props.children}
        </svg>
    )
}
Svg.defaultProps = {
    width: 120,
    height: 120,
    fill: 'none',
    strokeDasharray: '',
    stroke: '#000',
    strokeWidth: 2
}
export default Svg;