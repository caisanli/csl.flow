// 扇形
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot, { dotHeight } from '@assets/js/dots';
import {deepClone} from '@assets/js/utils';
let newDefaultDot = deepClone(defaultDot)

export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
    let x = strokeWidth;
    let y = strokeWidth;

    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;
    let offsetHeight = Math.round(newHeight / 5);
    let offsetWidth = Math.round(newWidth / 4);
    let graph = `M${ x } ${ offsetHeight }
                C${ newWidth / 4 } ${ -offsetHeight / 3.49 } ${ newWidth - newWidth / 4 } ${ -offsetHeight / 3.49 } ${ newWidth } ${ offsetHeight }
                L${ newWidth - offsetWidth } ${ newHeight }
                C${ newWidth - newWidth / 2.5 } ${ newHeight - offsetHeight / 3 } ${ newWidth / 2.5 } ${ newHeight - offsetHeight / 3 } ${ offsetWidth } ${ newHeight }
                L${ x } ${ offsetHeight }`;
    let dots = showDot ? [newDefaultDot.tc, Object.assign(newDefaultDot.mr, {
        top: offsetHeight - dotHeight / 2
    }), Object.assign(newDefaultDot.ml, {
        top: offsetHeight - dotHeight / 2
    }), Object.assign(newDefaultDot.bc, {
        bottom: (offsetHeight / 3) - dotHeight / 2
    })] : [];   

    return (
        <Svg {...props} dots={dots} >
            <path d={ graph } />
        </Svg>
    );
}