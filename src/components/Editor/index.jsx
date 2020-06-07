// 待优化：
// 画框到底时触发滚动条

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
            drawWidth: 0, // 框的宽度
            drawHeight: 0, // 框的高度
            drawLeft: 0, // 框的left
            drawTop: 0 // 框的top
        }
        // ref
        this.warpRef = React.createRef()
        this.scrollRef = React.createRef();
        // 属性
        this.boxWidth = 4000; // 容器宽度
        this.boxHeight = 4000; // 容器高度
        this.width = 1000; // 编辑区域宽度
        this.height = 900; // 编辑区域高度
        
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
            startX: 0, // 相对开始点 X
            startY: 0, // 相对开始点 Y
            scrollTop: 0, // 当前scrollTop
            scrollLeft: 0, // 当前scrollLeft
            offsetTop: 0, // 容器offsetTop
            offsetLeft: 0, // 容器offsetLeft
            distanceTop: (this.boxHeight - this.height) / 2, // 编辑区域离容器的top
            distanceLeft: (this.boxWidth - this.width) / 2, // 编辑区域离容器的left
            drawLeft: 0, // 画框时当宽度为负数时 记录一次框的left
            isDrawLeft: false, // 宽度是否为负数
            drawTop: 0, // 画框时当宽度为负数时 记录一次框的top
            isDrawTop: false // 高度是否为负数
        }
    }
    // 获取offset
    _getOffset(elem) {
        let top = elem.offsetTop
        let left = elem.offsetLeft
        let parent = elem.offsetParent
        while (parent) {
          top += parent.offsetTop
          left += parent.offsetLeft
          parent = parent.offsetParent
        }
        return {top, left}
    }
    // 画框开始
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
    // 画框中
    _onMouseMove(e) {
        let {isDown, startX, startY} = this.eventOption;
        if(!isDown) return ;
        let { pageX, pageY } = e;
        let { top, left } = this._computedPoint(pageX, pageY);
        let width = left - startX;
        let height = top - startY;
        let { drawLeft, drawTop } = this.state;
        let newDrawLeft = drawLeft, newDrawTop = drawTop;
        if(width < 0) {
            if(!this.eventOption.isDrawLeft) {
                this.eventOption.isDrawLeft = true;
                this.eventOption.drawLeft = drawLeft;
            }
            newDrawLeft = this.eventOption.drawLeft + width;
            this.setState({drawLeft: newDrawLeft, drawWidth: Math.abs(width)});
        } else {
            if(this.eventOption.isDrawLeft) {
                newDrawLeft = this.eventOption.drawLeft;
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
            newDrawTop = this.eventOption.drawTop + height;
            this.setState({drawTop: newDrawTop, drawHeight: Math.abs(height)});
        } else {
            if(this.eventOption.isDrawTop) {
                newDrawTop = this.eventOption.drawTop;
                this.setState({ drawTop: this.eventOption.drawTop });
                this.eventOption.isDrawTop = false;
            }
            this.setState({drawHeight: height});
        }
        if(this.props.draw) 
            this.props.draw({newDrawLeft, newDrawTop, width: Math.abs(width), height: Math.abs(height)});
    }
    // 画框结束
    _onMouseUp() {
        if(this.eventOption.isDown) {
            this.eventOption.isDown = false;
            this.eventOption.isDrawTop = false;
            this.eventOption.isDrawLeft = false;
            this.setState({
                drawHeight: 0,
                drawWidth: 0,
                drawTop: 0,
                drawLeft: 0
            })
        }
    }
    // 监听滚动
    _onScroll(left, top) {
        this.eventOption.scrollTop = top;
        this.eventOption.scrollLeft = left;
    }
    // 绑定事件
    _event() {
        let body = document.body;
        body.addEventListener('mousemove', this._onMouseMove)
        body.addEventListener('mouseup', this._onMouseUp)
    }
    // 计算相对坐标位置
    _computedPoint(x, y) { 
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
                           {/* 网格背景 */}
                            <div className={style.editorBg}>
                                <Grid width={1000} height={900} />
                            </div>
                            {/* 画框 */}
                            {<div className={style.drawBox} style={{width: drawWidth, height: drawHeight, left: drawLeft, top: drawTop}} />}
                            {this.props.children}
                        </div>
                    </div>
                </Scroll>
            </div>
        );
    }
}