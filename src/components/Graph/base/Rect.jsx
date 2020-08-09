// 圆形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth / 2;
    let y = strokeWidth / 2;
    width -= strokeWidth;
    height -= strokeWidth;
    // width += 2
    // height += 2;
    let id = Date.now() + Math.random();
    return (
        <Svg {...props} >
            
            <defs>
                {/* <ellipse  rx={rx} ry={ry} cx={cx} cy={cy}/> */}
                <rect id={id} x={x} y={y} width={width} height={height} />
                <clipPath id={'#' + id + '_clip'}>
                    <use xlinkHref={'#' + id}/>
                </clipPath>
            </defs>
            <use xlinkHref={'#' + id} fill={props.fill} stroke="#0081C6" strokeWidth={strokeWidth} clipPath={'url(#' + id + '_clip)'} />
        </Svg>
    );
}