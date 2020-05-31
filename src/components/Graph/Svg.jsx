import React from 'react';
// svg基础组件
function Svg (props) {
    let { width, height, viewBox, fill, stroke } = props;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={width} 
            height={height} 
            viewBox={viewBox} 
            fill={fill} 
            stroke={stroke} 
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
    stroke: '#000',
    viewBox: '0 0 120 120'
}
export default Svg;