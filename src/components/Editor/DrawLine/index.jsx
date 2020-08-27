import React from 'react';
import style from './index.module.less';
import { MIN_WIDTH, MIN_HEIGHT, GRAPH_WIDTH, LINE_HEIGHT } from './constant';
import createMiddleLeft from './middle-right';
import createBottomCenter from './bottom-center';
export default function Line(props) {
    let { width, height, left, top, zIndex, dir } = props;
    // 是否高度为负数
    let isHeightNegative = false;
    // 是否宽度为负数
    let isWidthNegative = false;
    console.log('之前的height：', height)
    // 当高度为负数
    if(height < 0) 
        isHeightNegative = true;
    height = Math.abs(height) + MIN_HEIGHT;

    if(width < 0) 
        isWidthNegative = true;
    width = Math.abs(width) + MIN_WIDTH;
    // 宽度 + 图形宽度
    // width = width < MIN_WIDTH + GRAPH_WIDTH ? MIN_WIDTH + GRAPH_WIDTH : width;
    // 高度
    // height = height < MIN_HEIGHT ? MIN_HEIGHT : height;
    console.log('之后的height：', height)
    let d = ``;
    switch(dir) {
        case 'middle-right':
            d = createMiddleLeft(width, height, isHeightNegative);
            break;
        case 'middle-left':
            d = createMiddleLeft(width, height, isHeightNegative);
            break;
        case 'bottom-center':
            d = createBottomCenter(width, height, isHeightNegative, isWidthNegative);
            break;
    }

    let styleObj = {
        left: left + 'px',
        top: top + 'px',
        zIndex
    }

    return (
        <svg className={style.drawLine} 
            style={ styleObj } 
            width={width} height={height} 
            strokeWidth="10" xmlns="http://www.w3.org/2000/svg" 
            version="1.1">
            <path d={d} />
        </svg>
    )
}