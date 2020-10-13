import React, { Component } from 'react';
import style from './index.module.less';
import { MIN_WIDTH, MIN_HEIGHT, GRAPH_WIDTH, LINE_HEIGHT } from './constant';
import createMiddleLeft from './middle-right';
import createBottomCenter from './bottom-center';

export default class Line extends Component {
    constructor() {
        super();
        this.eventOpt = {
            isDown: false,
            startX: 0,
            startY: 0
        }
        this.onMouseDownLine = this.onMouseDownLine.bind(this);
        this.onMouseDownPoint = this.onMouseDownPoint.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this)
    }

    onMouseDownLine(e) {
        e.stopPropagation();
        this.props.onClickLine && this.props.onClickLine(this.props.id)
    }
    onMouseDownPoint(e) {
        e.stopPropagation();
        let {pageX, pageY} = e;
        this.eventOpt.isDown = true;
        this.eventOpt.startY = pageY;
        this.eventOpt.startX = pageX;
        this.props.onClickLinePoint && this.props.onClickLinePoint(this.props.id)
    }
    onMouseMove(e) {
        let { isDown, startX, startY } = this.eventOpt;
        if(!isDown)
            return ;
        let {pageX, pageY} = e;
        let width = pageX - startX;
        let height = pageY - startY;
        if(this.props.prevHeightNegative) {
            height += this.props.prevHeight;
            if(height > -MIN_HEIGHT) 
                height = MIN_HEIGHT + MIN_HEIGHT + height;
            
        } else {
            height += this.props.prevHeight;
            height -= MIN_HEIGHT;
        }
        width += this.props.prevWidth;
        this.props.onMove && this.props.onMove({id: this.props.id, width, height, isAgin: true})
    }
    onMouseUp() {
        this.eventOpt.isDown = false;
        this.props.onUp && this.props.onUp({id: this.props.id})
    }
    componentDidMount() {
        const body = document.body;
        body.addEventListener('mousemove', this.onMouseMove)
        body.addEventListener('mouseup', this.onMouseUp)
    }
    componentWillUnmount() {
        const body = document.body;
        body.removeEventListener('mousemove', this.onMouseMove)
        body.removeEventListener('mouseup', this.onMouseUp)
    }
    render() {
        let { width, height, left, top, zIndex, bollDir, heightNegative } = this.props;

        // 是否高度为负数
        // let isHeightNegative = false;
        // 是否宽度为负数
        let isWidthNegative = false;
        // console.log('之前的height：', height)
        // 当高度为负数
        // if(height < 0) 
        //     isHeightNegative = true;
        height = Math.abs(height);

        if(width < 0) 
            isWidthNegative = true;
        width = Math.abs(width) + MIN_WIDTH;
        // 宽度 + 图形宽度
        // width = width < MIN_WIDTH + GRAPH_WIDTH ? MIN_WIDTH + GRAPH_WIDTH : width;
        // 高度
        // height = height < MIN_HEIGHT ? MIN_HEIGHT : height;
        // console.log('之后的height：', height)
        let graphObj = null;
        switch(bollDir) {
            case 'middle-right':
                graphObj = createMiddleLeft(width, height, heightNegative);
                break;
            case 'middle-left':
                graphObj = createMiddleLeft(width, height, heightNegative);
                break;
            case 'bottom-center':
                graphObj = createBottomCenter(width, height, heightNegative, isWidthNegative);
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
                xmlns="http://www.w3.org/2000/svg" 
                version="1.1">
                <path strokeWidth="1" 
                    stroke={this.props.active ? '#FF9800' : 'transparent'} 
                    onMouseDown={this.onMouseDownLine} 
                    d={graphObj.path} />
                <path d={graphObj.endPoint} 
                    style={{cursor: 'move'}}
                    onMouseDown={this.onMouseDownPoint}/>
            </svg>
        )
    }
}