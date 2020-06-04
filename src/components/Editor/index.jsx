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
        // 事件标识
        this.eventOption = {
            isDown: false,
            startX: 0,
            startY: 0,
            scrollTop: 0,
            scrollLeft: 0,
            offsetTop: 0,
            offsetLeft: 0
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
        console.log('left：', left)
        console.log('top：', top)
        return {top, left}
    }
    _onMouseDown(e) {
        let {pageX, pageY, clientX} = e;
        let {offsetLeft, offsetTop, scrollLeft, scrollTop} = this.eventOption;
        this.eventOption.isDown = true;
        this.eventOption.startX = pageX;
        this.eventOption.startY = pageY;
        console.log('clientX：', clientX)
        console.log('pageX：', pageX)
        console.log('left：', pageX - offsetLeft + scrollLeft)
        console.log('top：', pageY - offsetTop + scrollTop)
        this.setState({
            drawLeft: offsetLeft - pageX  + scrollLeft,
            drawTop: offsetTop - pageY + scrollTop
        })
    }
    _onMouseMove(e) {
        let {isDown, startX, startY} = this.eventOption;
        if(!isDown) return ;
        let { pageX, pageY } = e;
        let width = Math.abs(pageX - startX);
        let height = Math.abs(pageY - startY);
        this.setState({
            drawWidth: width,
            drawHeight: height
        })
    }
    _onMouseUp() {
        if(this.eventOption.isDown)
            this.eventOption.isDown = false;
    }
    _onScroll(left, top) {
        console.log('left：', left)
        console.log('top：', top)
        this.eventOption.scrollTop = top;
        this.eventOption.scrollLeft = left;
    }
    _event() {
        let body = document.body;
        body.addEventListener('mousemove', this._onMouseMove)
        body.addEventListener('mouseup', this._onMouseUp)
    }
    componentDidMount() {
        this._event()
        let offset = this._getOffset(this.warpRef.current);
        console.log(offset)
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
        let {drawHeight, drawWidth, drawTop, drawLeft} = this.state;
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