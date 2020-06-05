// 编辑框
import React from 'react';
// 组件
import Scroll from '@comp/Scroll';
import Grid from '@comp/Grid';
// 样式
import style from './index.module.less';
export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        // state
        this.state = {
            drawWidth: 0,
            drawHeight: 0,
            drawLeft: 0,
            drawTop: 0
        }
        // ref
        this.warpRef = React.createRef()
        this.scrollRef = React.createRef();
        // 属性
        this.boxWidth = 4000;
        this.boxHeight = 4000;
        this.width = 1000;
        this.height = 900;
        
        // 事件
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onScroll = this._onScroll.bind(this);
        // 方法
        this._computedPoint = this._computedPoint.bind(this);
        // 事件标识
        this.eventOption = {
            isDown: false,
            startX: 0, // 开始
            startY: 0,
            scrollTop: 0,
            scrollLeft: 0,
            offsetTop: 0,
            offsetLeft: 0,
            distanceTop: (this.boxHeight - this.height) / 2,
            distanceLeft: (this.boxWidth - this.width) / 2,
            drawLeft: 0,
            isDrawLeft: false,
            drawTop: 0,
            isDrawTop: false,
            isMoving: false
        }
    }
    _getOffset(elem) {
        // 获取offset
        let top = elem.offsetTop
        let left = elem.offsetLeft
        let parent = elem.offsetParent
        while (parent) {
          top += parent.offsetTop
          left += parent.offsetLeft
          parent = parent.offsetParent
        }
        console.log('offsetLeft：', left)
        console.log('offsetTop：', top)
        return {top, left}
    }
    _onMouseDown(e) {
        let { pageX, pageY } = e;
        this.eventOption.isDown = true;
        let { top, left } = this._computedPoint(pageX, pageY);
        this.eventOption.startX = left;
        this.eventOption.startY = top;
        this.setState({
            drawLeft: left,
            drawTop: top
        })
    }
    _onMouseMove(e) {
        let {isDown, startX, startY} = this.eventOption;
        if(!isDown) return ;
        let { pageX, pageY } = e;
        let { top, left } = this._computedPoint(pageX, pageY);
        let width = left - startX;
        let height = top - startY;
        let { drawLeft, drawTop } = this.state;
        if(width < 0) {
            if(!this.eventOption.isDrawLeft) {
                this.eventOption.isDrawLeft = true;
                this.eventOption.drawLeft = drawLeft;
            }
            this.setState({drawLeft: this.eventOption.drawLeft + width, drawWidth: Math.abs(width)});
        } else {
            if(this.eventOption.isDrawLeft) {
                this.setState({ drawLeft: this.eventOption.drawLeft });
                this.eventOption.isDrawLeft = false;
            }   
            this.setState({drawWidth: width});
        }
        if(height < 0) {
            if(!this.eventOption.isDrawTop) {
                this.eventOption.isDrawTop = true;
                this.eventOption.drawTop = drawTop;
            }
            this.setState({drawTop: this.eventOption.drawTop + height, drawHeight: Math.abs(height)});
        } else {
            if(this.eventOption.isDrawTop) {
                this.setState({ drawTop: this.eventOption.drawTop });
                this.eventOption.isDrawTop = false;
            }
            this.setState({drawHeight: height});
        }
    }
    _onMouseUp() {
        if(this.eventOption.isDown) {
            this.eventOption.isDown = false;
            // this.eventOption.isDrawTop = false;
            // this.eventOption.isDrawLeft = false;
            // this.setState({
            //     drawHeight: 0,
            //     drawWidth: 0,
            //     drawTop: 0,
            //     drawLeft: 0
            // })
        }
    }
    _onScroll(left, top) {
        this.eventOption.scrollTop = top;
        this.eventOption.scrollLeft = left;
    }
    _event() {
        let body = document.body;
        body.addEventListener('mousemove', this._onMouseMove)
        body.addEventListener('mouseup', this._onMouseUp)
    }
    _computedPoint(x, y) { // 计算坐标位置
        let { offsetLeft, offsetTop, scrollLeft, scrollTop, distanceLeft, distanceTop } = this.eventOption;
        return {
            top: y - offsetTop - (distanceTop - scrollTop),
            left: x - offsetLeft - (distanceLeft - scrollLeft)  
        };
    }
    componentDidMount() {
        this._event()
        let offset = this._getOffset(this.scrollRef.current.$content.current);
        this.eventOption.offsetLeft = offset.left;
        this.eventOption.offsetTop = offset.top;
    }
    componentWillUnmount() {
        let body = document.body;
        body.removeEventListener('mousemove', this._onMouseMove)
        body.removeEventListener('mouseup', this._onMouseUp)
        
    }
    render() {
        let width = this.width + 'px';
        let height = this.height + 'px';
        let { drawHeight, drawWidth, drawTop, drawLeft } = this.state;
        return (
            <div className={style.editorBox} >
                <Scroll ref={this.scrollRef} center scroll={this._onScroll}>
                    <div className={style.editorContainer}>
                        <div ref={this.warpRef} onMouseDown={this._onMouseDown} className={style.editorWarp} style={{width, height}}>
                            <div className={style.editorBg}>
                                <Grid width={1000} height={900} />
                            </div>
                            {<div className={style.drawBox} style={{width: drawWidth, height: drawHeight, left: drawLeft, top: drawTop}} />}
                        </div>
                    </div>
                </Scroll>
            </div>
        );
    }
}