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
    strokeWidth: '5',
    viewBox: '0 0 1024 1024'
}
export default Svg;