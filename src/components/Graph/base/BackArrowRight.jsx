// 右返回箭头
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;

    let WH = newWidth / 4;
    let offsetHeight = Math.round(newHeight / 5);
    let arrowHeight = newHeight / 6;
    
    let arrowWidthOffset = newWidth / 7;
    let arrowLeftPoint = (newWidth - (WH * 2 + arrowWidthOffset * 2)) + WH;

    let graph = `M${ arrowWidthOffset } ${ offsetHeight }
                C${ (newWidth - arrowWidthOffset) / 5 + arrowWidthOffset } ${ -offsetHeight / 3.49 } ${ newWidth - ((newWidth - arrowWidthOffset) / 5) } ${ -offsetHeight / 3.49 } ${ newWidth } ${ offsetHeight } 
                V${ newHeight }
                H${ newWidth - WH }
                V${ offsetHeight }
                H${ WH + arrowWidthOffset }
                V${ newHeight - arrowHeight }
                H${ arrowWidthOffset * 2 + WH }
                L${ arrowWidthOffset + WH / 2 } ${ newHeight }
                L${ x } ${ newHeight - arrowHeight }
                H${ arrowWidthOffset }
                Z`
    return (
        <Svg {...props} >
	        <path d={graph} />
        </Svg>
    );
}