// 待优化：
// 画框到底时触发滚动条

// 编辑框
import React from 'react';
// 组件
import Scroll from '@comp/Scroll';
import Grid from '@comp/Grid';
import Transform from '@comp/Transform';
// import Transform from './Graph';
import AlignLine from '@comp/AlignLine';
// 工具
import { deepClone } from '@utils';
// 样式
import style from './index.module.less';
export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        // state
        this.state = {
            isDraw: false,
            drawWidth: 0, // 框的宽度
            drawHeight: 0, // 框的高度
            drawLeft: 0, // 框的left
            drawTop: 0, // 框的top
            alignLines: [], // 水平线
            selectWidth: 0,
            selectHeight: 0,
            selectLeft: 0,
            selectTop: 0,
            selectX: 0,
            selectY: 0,
            selectActive: false 
        }
        // ref
        this.warpRef = React.createRef()
        // 属性
        this.positions = []; // 记录图形坐标
        this.selectPositions = [];
        // 事件
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
        this._onTransformDown = this._onTransformDown.bind(this);
        this._onTransformMove = this._onTransformMove.bind(this);
        this._onPosition = this._onPosition.bind(this);
        this._onSelectPosition = this._onSelectPosition.bind(this);
        this._onEnd = this._onEnd.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onClickBody = this._onClickBody.bind(this);
        // 方法

        // 属性
        this.selected = []; // 已框选中
        // 事件标识
        this.eventOption = {
            isDown: false,
            startX: 0, // 相对开始点 X
            startY: 0, // 相对开始点 Y
            drawLeft: 0, // 画框时当宽度为负数时 记录一次框的left
            isDrawLeft: false, // 宽度是否为负数
            drawTop: 0, // 画框时当宽度为负数时 记录一次框的top
            isDrawTop: false // 高度是否为负数
        }
    }
    // 画框开始
    _onMouseDown(e) {
        if(this._onClickBody)
            this._onClickBody(e);        
        let { pageX, pageY } = e;
        this.eventOption.isDown = true;
        this.selected = [];
        let { top, left } = this.props.getRelativePoint(pageX, pageY);
        this.eventOption.startX = left;
        this.eventOption.startY = top;
        this.setState({
            drawLeft: left,
            drawTop: top,
            isDraw: true
        })
    }
    // 画框中
    _onMouseMove(e) {
        e.stopPropagation();
        let {isDown, startX, startY} = this.eventOption;
        if(!isDown) return ;
        let { pageX, pageY } = e;
        let { top, left } = this.props.getRelativePoint(pageX, pageY);
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
        let selected = this.positions.filter(p => {
            if(
                p.left > obj.newDrawLeft
                && p.top > obj.newDrawTop
                && p.left + p.width < obj.newDrawLeft + obj.width 
                && p.top + p.height < obj.newDrawTop + obj.height
            )
                return true;
            return false
        })
        this.selected = selected;
    }
    // 画框结束
    _onMouseUp() {
        if(!this.eventOption.isDown) return ;
        this.eventOption.isDown = false;
        this.eventOption.isDrawTop = false;
        this.eventOption.isDrawLeft = false;
        this.setState({
            drawHeight: 0,
            drawWidth: 0,
            drawTop: 0,
            drawLeft: 0,
            isDraw: false
        })
        if(this.selected.length > 1) {
            setTimeout(() => {
                this._drawSelectedBox();
            }, 0)
        }
    }
    // 框选后画一个大框
    _drawSelectedBox() {
        let minTop = 0, minLeft = 0, maxTH = 0, maxLW = 0;
        this.selected.forEach((s, i) => {
            let {left, top, width, height} = s;
            if(i === 0) {
                minTop = top;
                minLeft = left;
                maxTH = top + height;
                maxLW = left + width;
                return ;
            }
            if(left < minLeft)
                minLeft = left;
            if(top < minTop)
                minTop = top;
            if(maxTH < top + height)
                maxTH = top + height;
            if(maxLW < left + width)
                maxLW = left + width;
        });
        let {x, y} = this.props.getPagePosition(minLeft, minTop);
        this.setState({
            selectHeight: maxTH - minTop,
            selectWidth: maxLW - minLeft,
            selectTop: minTop,
            selectLeft: minLeft,
            selectX: x,
            selectY: y,
            selectActive: true
        })
    }
    // 绑定事件
    _event() {
        document.addEventListener('mousemove', this._onMouseMove)
        document.addEventListener('mouseup', this._onMouseUp)
        document.addEventListener('click', this._onClickBody)
        document.addEventListener('keyup', this._onKeyUp)
    }
    _onKeyUp(e) {
        let {active, editing} = this.props;
        if(e.keyCode === 8 && active && !editing) {
            this.props.delete(this.props.active);
        }
    }
    // 监听Transform组件的mousedown事件
    _onTransformDown(left, top, e) {
        e.stopPropagation();
        let {pageX, pageY} = e;
        let {x, y} = this.props.getPagePosition(left, top);
        let position = this.props.getRelativePoint(pageX, pageY);
        this.selectPositions = deepClone(this.positions);
        return {x, y, startX: position.left, startY: position.top}
    }
    // 监听框选的框的图形位置大小角度变化
    _onSelectPosition(obj) {
        if(this.props.selectChange) {
            let positions = deepClone(this.selectPositions).map(p => {
                let sel = this.selected.find(s => p.id === s.id);
                if(sel) {
                    p.left = p.left + obj.offsetLeft;
                    p.top = p.top + obj.offsetTop;
                    p.rotate = p.rotate + obj.offsetRotate;
                    p.width = p.width + obj.offsetWidth;
                    p.height = p.height + obj.offsetHeight;
                }
                return p;
            });
            this.props.selectChange(obj, positions);
        }
    }
    // 监听图形位置大小角度变化
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
    _onClickBody(e) {
        let className = e.target.className;
        if(typeof className === 'string') {
            let classNames = ['src-components-Transform-index-module__transform', 
                                'src-pages-editor-index-module__editor-content', 
                                'src-components-Editor-index-module__editor--graph-warp_editor',
                                'src-components-Editor-index-module__editor--graph-warp']
            for(let i = 0; i < classNames.length; i++) {
                let is = className.includes(classNames[i]);
                if( is || (this.props.mouseup && is)) {
                    return ;
                }
            }
        }
        if(this.state.selectActive) {
            this.setState({
                selectActive: false
            })
        }
        if(this.props.graphClick)
            this.props.graphClick();
    }
    // 双击图形
    _onDoubleClick(g, e) {
        if(this.props.graphDoubleClick) {
            this.props.graphDoubleClick(g);
            let elem = document.getElementById(`editor-graph-warp-editor-${g.id}`);
            elem.focus()
            // elem.click()
        }
            
    }
    // 监听点击
    _onClick(g, e) {
        if(this.props.graphClick)
            this.props.graphClick(g);
    }
    // 监听移动结束
    _onEnd(e) {
        this.selectPositions = [];
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
    }
    // 监听Transform组件的mousemove事件
    _onTransformMove(e) {
        let {pageX, pageY} = e;
        let position = this.props.getRelativePoint(pageX, pageY);
        return {x: position.left, y: position.top}
    }
    componentDidMount() {
        this._event();
    }
    componentWillUnmount() {
        // let body = document.body;
        document.removeEventListener('mousemove', this._onMouseMove)
        document.removeEventListener('mouseup', this._onMouseUp)
        document.removeEventListener('click', this._onClickBody)
    }
    componentDidUpdate(prevProps) {
        if(this.props.editing !== prevProps.editing) {
            let elem = document.getElementById(`editor-graph-warp-editor-${this.props.editing}`);
            elem && elem.focus()
        }
    }
    render() {
        let { drawHeight, drawWidth, drawTop, drawLeft, alignLines, selectHeight, 
                selectWidth, selectTop, selectLeft, selectX, selectY, selectActive,
                isDraw 
            } = this.state;
        let { graphs, active, editing, scroll, width, height, warpWidth, warpHeight } = this.props;
        return (
            <div className={style.editorBox}>
                <Scroll center scroll={scroll}>
                    <div className={style.editorContainer} style={{width: width + 'px', height: height + 'px'}}>
                        <div ref={this.warpRef} 
                            onMouseDown={this._onMouseDown} 
                            className={style.editorWarp} 
                            style={{width: warpWidth + 'px', height: warpHeight + 'px'}}>
                           {/* 网格背景 */}
                            <div className={style.editorBg}>
                                <Grid width={warpWidth} height={warpHeight} />
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
                            {isDraw && <div className={style.drawBox} 
                                    style={{width: drawWidth, height: drawHeight, left: drawLeft, top: drawTop}} />}
                            {/* 框选后的画框 */}
                            { selectActive && <Transform down={this._onTransformDown} 
                                        change={this._onSelectPosition}
                                        move={this._onTransformMove}
                                        end={this._onEnd}
                                        click={e => e.stopPropagation()}
                                        select={true} width={selectWidth} height={selectHeight} 
                                        left={selectLeft} top={selectTop} 
                                        x={selectX} y={selectY}
                                        active={selectActive} /> }
                            {/* 已有的图形列表 */}
                            {
                                graphs.map(g => {
                                    if(selectActive) 
                                        g.selected = !!this.selected.find(s => s.id === g.id);
                                    return (<Transform change={this._onPosition} 
                                                        click={e => {
                                                            this._onClick(g, e)}
                                                        }
                                                        doubleClick={e => {
                                                            this._onDoubleClick(g, e)}
                                                        }
                                                        end={this._onEnd} 
                                                        active={active === g.id} 
                                                        down={this._onTransformDown} 
                                                        move={this._onTransformMove} 
                                                        key={g.id} {...g}>
                                                <div onClick={e => e.stopPropagation()} className={[style.editorGraphWarp, editing === g.id ? style.editing : ''].join(' ')} >
                                                    <div id={`editor-graph-warp-editor-${g.id}`} className={style.editorGraphWarpEditor} contentEditable></div>
                                                </div>
                                            </Transform>)
                                })
                            }
                        </div>
                    </div>
                </Scroll>
            </div>
        );
    }
}