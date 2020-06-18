// 待优化：
// 画框到底时触发滚动条

// 编辑框
import React from 'react';
// 组件
import Scroll from '@comp/Scroll';
import Grid from '@comp/Grid';
import Transform from '@comp/Transform';
import AlignLine from '@comp/AlignLine';
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
            drawTop: 0, // 框的top
            alignLines: [], // 水平线
            temporary: {}, // 临时图形
        }
        // ref
        this.warpRef = React.createRef()
        this.scrollRef = React.createRef();
        // 属性
        this.boxWidth = 4000; // 容器宽度
        this.boxHeight = 4000; // 容器高度
        this.width = 1000; // 编辑区域宽度
        this.height = 900; // 编辑区域高度
        this.positions = []; // 记录图形坐标
        // 事件
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._onTransformDown = this._onTransformDown.bind(this);
        this._onTransformMove = this._onTransformMove.bind(this);
        this._onPosition = this._onPosition.bind(this);
        this._onEnd = this._onEnd.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onClickBox = this._onClickBox.bind(this);
        // 方法
        this._computedPoint = this._computedPoint.bind(this);
        let distanceLeft = (this.boxWidth - this.width) / 2;
        let distanceTop = (this.boxHeight - this.height) / 2;
        // 事件标识
        this.eventOption = {
            isDown: false,
            startX: 0, // 相对开始点 X
            startY: 0, // 相对开始点 Y
            scrollTop: 0, // 当前scrollTop
            scrollLeft: 0, // 当前scrollLeft
            offsetTop: 0, // 容器offsetTop
            offsetLeft: 0, // 容器offsetLeft
            distanceTop , // 编辑区域离容器的top
            distanceLeft , // 编辑区域离容器的left
            drawLeft: 0, // 画框时当宽度为负数时 记录一次框的left
            isDrawLeft: false, // 宽度是否为负数
            drawTop: 0, // 画框时当宽度为负数时 记录一次框的top
            isDrawTop: false // 高度是否为负数
        }
        props.distanceChange && props.distanceChange(distanceLeft, distanceTop);
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
        if(this.props.change)
            this.props.change();
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
        let obj = {newDrawLeft, newDrawTop, width: Math.abs(width), height: Math.abs(height)};
        this._selecting(obj)
        if(this.props.draw) 
            this.props.draw(obj);
    }
    _selecting(obj) {
        let selects = this.positions.filter(p => {
            if(
                p.left > obj.newDrawLeft
                && p.top > obj.newDrawTop
                && p.left + p.width < obj.newDrawLeft + obj.width 
                && p.top + p.height < obj.newDrawTop + obj.height
            )
                return true;
            return false
        })
        console.log(selects)
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
    // 监听Transform组件的mousedown事件
    _onTransformDown(left, top, e) {
        let {pageX, pageY} = e;
        let { offsetLeft, offsetTop, scrollLeft, scrollTop, distanceLeft, distanceTop } = this.eventOption;
        let y = offsetTop + (distanceTop - scrollTop) + top;
        let x = offsetLeft + (distanceLeft - scrollLeft) + left;
        let position = this._computedPoint(pageX, pageY);
        return {x, y, startX: position.left, startY: position.top}
    }
    // 监听坐标
    _onPosition(obj) {
        let index = -1;
        let is = this.positions.some((g, i) => {
            index = i;
            return g.id === obj.id;
        });
        if(is)
            this.positions.splice(index, 1, obj);
        else
            this.positions.push(obj);
        if(this.positions.length > 1) {
            this._setAlignment(obj);
        }
    }
    // 点击容器
    _onClickBox() {
        if(this.props.change)
            this.props.change();
    }
    // 监听点击
    _onClick(g, e) {
        e.stopPropagation();
        if(this.props.change)
            this.props.change(g);
    }
    // 监听移动结束
    _onEnd() {
        this.setState({
            alignLines: []
        })
    }
    // 设置对齐线
    _setAlignment(obj) {
        let alignArr = [];
        let {width, height, top, left, id} = obj;
        this.positions.forEach(p => {
            if(id === p.id) return ;
            let newObj = {id, top, left};
            if(top === p.top || top === (p.top + p.height)) {
                newObj.alignType = 'top'
                alignArr.push(newObj)
            } else if((top + height) === p.top) {
                newObj.alignType = 'top'
                newObj.top = p.top;
                alignArr.push(newObj)
            } else if(left === p.left || left === (p.left + p.width)) {
                newObj.alignType = 'left'
                alignArr.push(newObj)
            } else if((left + width) === p.left) {
                newObj.alignType = 'left'
                newObj.left = p.left;
                alignArr.push(newObj)
            } else if(top + height / 2 === p.top + p.height / 2) {
                newObj.alignType = 'top'
                newObj.top = top + height / 2;
                alignArr.push(newObj)
            } else if(left + width / 2 === p.left + p.width / 2) {
                newObj.alignType = 'left'
                newObj.left = left + width / 2;
                alignArr.push(newObj)
            }
        });
        this.setState({
            alignLines: alignArr
        })
        // console.log(alignArr);
    }
    // 监听Transform组件的mousemove事件
    _onTransformMove(e) {
        let {pageX, pageY} = e;
        let position = this._computedPoint(pageX, pageY);
        return {x: position.left, y: position.top}
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
        let { drawHeight, drawWidth, drawTop, drawLeft, alignLines } = this.state;
        let { graphs, active } = this.props;
        return (
            <div className={style.editorBox} onClick={this._onClickBox}>
                <Scroll ref={this.scrollRef} center scroll={this._onScroll}>
                    <div className={style.editorContainer}>
                        <div ref={this.warpRef} onMouseDown={this._onMouseDown} className={style.editorWarp} style={{width, height}}>
                           {/* 网格背景 */}
                            <div className={style.editorBg}>
                                <Grid width={1000} height={900} />
                            </div>
                            {/* 水平线 */}
                            {
                                alignLines.map((l, i) => (
                                    <AlignLine width={this.boxWidth} 
                                                height={this.boxHeight} 
                                                disLeft={this.eventOption.distanceLeft}
                                                disTop={this.eventOption.distanceTop}
                                                key={i} 
                                                {...l} />
                                ))
                            }
                            {/* 画框 */}
                            {<div className={style.drawBox} style={{width: drawWidth, height: drawHeight, left: drawLeft, top: drawTop}} />}

                            {/* 已有的图形列表 */}
                            {
                                graphs.map(g => {
                                    let {x, y, ...other} = g;
                                    let position = this._computedPoint(x, y);
                                    let props = Object.assign({}, other, position, {x, y});                                    
                                    return (<Transform change={this._onPosition} 
                                                        click={e => this._onClick(g, e)}
                                                        end={this._onEnd} 
                                                        active={active === g.id} 
                                                        down={this._onTransformDown} 
                                                        move={this._onTransformMove} 
                                                        key={g.id} {...props} />)
                                })
                            }
                        </div>
                    </div>
                </Scroll>
            </div>
        );
    }
}