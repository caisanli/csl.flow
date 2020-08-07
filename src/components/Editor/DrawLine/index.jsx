import React from 'react';
import style from './index.module.less';
export default function Line(props) {
    let { width, height, left, top, zIndex } = props;
    // 是否未负数
    let isNegative = false;
    // 当高度为负数
    // console.log('self：', props.self)
    if(height < 0) {
        isNegative = true;
        height = Math.abs(height) + 20;
        // if(props.self)
        //     height = Math.abs(height) + 20;
        // else
        //     height = Math.abs(height)
    }
    // 高度最小为20
    height = height < 20 ? 20 : height;
    // 前后指针图形的宽度
    const GRAPH_WIDTH = 8; 
    // X、Y的开始点
    const START_XY = 8; 
    // X轴的结束点
    const END_X = 8; 
    // 线的高度
    const LINE_HEIGHT = 20 - START_XY * 2; 

    // 两根线之间的高度
    let offsetHeight = height - LINE_HEIGHT * 2 - START_XY * 2;
    // 路径的高度指定20
    // if(props.self)
        // height = offsetHeight <= 0 && offsetHeight >= -4 ? 20 : height;
    // 起点时的指针图形（暂时三角）
    let startGraphPoint = ``;
    // 结束点时指针图形（暂时三角）
    let endGraphPoint = ``;
    // 上方的连线
    let upLine = `H ${width - GRAPH_WIDTH - END_X}`;
    // 结束时的连线
    let endLine = `H ${ START_XY }`;
    // 开始点
    let startPoint = ``;
    // 图形结束时连接线的点
    let graphToLinePoint = ``;

    // 为负数时 向上折叠
    if(isNegative) {
        startPoint = `M ${ START_XY } ${ height - START_XY - LINE_HEIGHT }`;
        if(offsetHeight > 0) {
            let upX = (width - START_XY * 2) / 2 - LINE_HEIGHT / 2;
            upLine = `L ${ upX } ${ height - START_XY - LINE_HEIGHT } L ${ upX } ${ START_XY } H ${width - GRAPH_WIDTH - END_X}`;
            let downX = (width - START_XY * 2) / 2 + LINE_HEIGHT / 2;
            endLine = `L ${ downX } ${ LINE_HEIGHT + START_XY } L ${ downX } ${ offsetHeight + START_XY + LINE_HEIGHT + 4 } H ${ START_XY }`;
        }
        endGraphPoint = `L ${width - GRAPH_WIDTH - END_X} ${ 4 } L ${ width - END_X } ${ 10 } L ${ width - GRAPH_WIDTH - END_X } ${ START_XY + 4 + 4 }`;
        graphToLinePoint = `L ${ width - GRAPH_WIDTH - END_X } ${ START_XY + 4 }`;
    } else { // 为正数时 向下折叠
        startPoint = `M ${ START_XY } ${ START_XY }`;
        if(offsetHeight > 0) {
            let upX = (width - START_XY * 2) / 2 + LINE_HEIGHT / 2;
            upLine = `L ${ upX } ${ START_XY } L ${ upX } ${ offsetHeight + START_XY + LINE_HEIGHT } H ${width - GRAPH_WIDTH - END_X}`;
            let downX = (width - START_XY * 2) / 2 - LINE_HEIGHT / 2;
            endLine = `L ${ downX } ${ height - START_XY } L ${ downX } ${ START_XY + LINE_HEIGHT } H ${ START_XY }`;
        }
        endGraphPoint = `L ${width - GRAPH_WIDTH - END_X} ${ height - 16 } L ${ width - END_X } ${ height - 10 } L ${ width - GRAPH_WIDTH - END_X } ${ height - 4 }`;
        graphToLinePoint = `L ${ width - GRAPH_WIDTH - END_X } ${ height - START_XY }`;
    }
    let d = `${ startPoint } ${ upLine } ${ endGraphPoint } ${ graphToLinePoint } ${ endLine }`;

    let styleObj = {
        left: left + 'px',
        top: top + 'px',
        zIndex
    }
    return (
        <svg className={style.drawLine} 
            style={ styleObj } 
            width={width} height={height} 
            strokeWidth="10" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <path d={d} />
        </svg>
    )
}