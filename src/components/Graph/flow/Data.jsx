// 数据
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot, { dotWidth } from '@assets/js/dots';
import {deepClone} from '@assets/js/utils';
let newDefaultDot = deepClone(defaultDot)
export default function(props) {
    
    let {width, height, strokeWidth, showDot} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;

    let offsetWidth = Math.round(newWidth / 6);
    let graph = `M${ x + offsetWidth } ${ y }
                H${ newWidth }
                L${ newWidth - offsetWidth } ${ newHeight }
                H${ x }
                Z`;
    let dots = showDot ? [newDefaultDot.tc, Object.assign(newDefaultDot.mr, {
        right: offsetWidth / 2 - dotWidth / 5
    }), Object.assign(newDefaultDot.ml, {
        left: offsetWidth / 2 - dotWidth / 5
    }), newDefaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <path d={graph} />
        </Svg>
    );
}