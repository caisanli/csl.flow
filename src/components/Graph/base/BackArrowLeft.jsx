// 左返回箭头
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot from '@assets/js/dots';

export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;

    let WH = newWidth / 4;
    let offsetHeight = Math.round(newHeight / 5);
    let arrowHeight = newHeight / 6;
    
    let arrowWidthOffset = newWidth / 7;
    let arrowLeftPoint = (newWidth - (WH * 2 + arrowWidthOffset * 2)) + WH;

    let graph = `M${ x } ${ offsetHeight }
                C${ (newWidth - arrowWidthOffset) / 5 } ${ -offsetHeight / 3.49 } ${ newWidth - ((newWidth - arrowWidthOffset) / 5) - arrowWidthOffset} ${ -offsetHeight / 3.49 } ${ newWidth - arrowWidthOffset } ${ offsetHeight } 
                V${ newHeight - arrowHeight }
                H${ newWidth }
                L${ newWidth - WH / 2 - arrowWidthOffset } ${ newHeight }
                L${ arrowLeftPoint } ${ newHeight - arrowHeight }
                H${ arrowLeftPoint + arrowWidthOffset }
                V${ offsetHeight }
                H${ WH }
                V${ newHeight }
                H${ x }
                Z`;
    let dots = showDot ? [defaultDot.mr, defaultDot.ml] : [];   

    return (
        <Svg {...props} dots={dots}>
	        <path d={graph} />
        </Svg>
    );
}