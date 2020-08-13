import React, { useState } from 'react';
// svg基础组件
import DrawBoll from '@comp/Editor/DrawBoll';
function Svg (props) {
    let { dots, children, showDot, ...svgProps } = props;
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" 
                {...svgProps}
                version="1.1"
            >
                {children}
            </svg>
            { !!dots.length && <DrawBoll dots={dots} /> }
        </>
    )
}
Svg.defaultProps = {
    width: 120,
    height: 120,
    fill: 'none',
    strokeDasharray: '',
    stroke: '#000',
    strokeWidth: 2,
    dots: []
}
export default Svg;