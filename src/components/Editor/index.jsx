// 待优化：
// 画框到底时触发滚动条

// 编辑框
import React from 'react';
import { connect } from 'react-redux';
// actions
import { addRecord, setStep, spliceRecord } from '@/actions/handleRecord';
// 组件
import Scroll from '@comp/Scroll';
import Grid from '@comp/Grid';
import Transform from '@comp/Transform';
// import Transform from './Graph';
import AlignLine from '@comp/AlignLine';
import DrawBoll from './DrawBoll';
import DrawLine from './DrawLine';
// 工具
import { deepClone } from '@assets/js/utils';
// 样式
import style from './index.module.less';
class Editor extends React.Component {
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
            selectActive: false, // 是否在画框
            drawLines: [], // 
        }
        // ref
        this.warpRef = React.createRef()
        // 属性
        this.positions = []; // 记录图形坐标
        this.selectPositions = [];
        this.isLoad = false;
        // 事件
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
        this._onTransformDown = this._onTransformDown.bind(this);
        this._onTransformMove = this._onTransformMove.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onSelectPosition = this._onSelectPosition.bind(this);
        this._onSelectEnd = this._onSelectEnd.bind(this);
        this._onEnd = this._onEnd.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onClickBody = this._onClickBody.bind(this);
        this._onLoadGraph = this._onLoadGraph.bind(this);
        this._onEditorChange = this._onEditorChange.bind(this)
        this._onEditorBlur = this._onEditorBlur.bind(this)
        this._onDrawBollDown = this._onDrawBollDown.bind(this)
        this._onDrawBollMove = this._onDrawBollMove.bind(this)

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
        let graphs = this.props.graphs;
        let selected = this.positions.filter(p => {
            let g = graphs.find(g => g.id === p.id);
            if(g.lock) return false;
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
        document.addEventListener('keyup', this._onKeyUp)
    }
    _onKeyUp(e) {
        let {active, editing} = this.props;
        if(e.keyCode === 8 && active && !editing) {
            let id = this.props.active;
            let handle = this.props.graphs.find(g => g.id === id);
            this.props.addRecord({type: 'delete', ...handle});
            this.props.delete(id);
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
            this.props.selectChange(positions);
        }
    }
    // 监听图形位置大小角度变化
    _onChange(obj) {
        let index = -1;
        let is = this.positions.some((g, i) => {
            index = i;
            return g.id === obj.id;
        });
        if(is)
            this.positions.splice(index, 1, obj);
        else
            this.positions.push(obj);
        this._setDrawLineByChange(obj);
        if(this.positions.length > 1) {
            this._setAlignment(obj);
        }
    }
    // 根据图形变化设置划线
    _setDrawLineByChange(obj) {
        // 找到图形对应的线
        let lines = this.state.drawLines.filter(d => d.parent === obj.id);
        if(!lines.length) return ;
        lines = lines.map(line => {
            line.left = obj.left + obj.width;
            line.width = line.prevWidth - obj.offsetLeft;
            line.height = Math.abs(line.prevHeight) - obj.offsetTop;
            let baseTop = obj.top + obj.height / 2 - 10;
            if(line.prevHeight > 0 && obj.offsetTop >= 0 && obj.offsetTop > Math.abs(line.prevHeight)) {
                line.top = baseTop - Math.abs(line.height);
            } else if(line.prevHeight < 0) {
                let height = obj.offsetTop < 0 ? line.prevHeight + Math.abs(obj.offsetTop) : line.prevHeight - obj.offsetTop;
                line.top = height < 0 ? line.prevTop : baseTop; 
                line.height = height; // obj.offsetTop < 0 ? line.prevHeight + Math.abs(obj.offsetTop) : line.prevHeight - obj.offsetTop;
            } else {
                line.top = baseTop;
            }
            console.log('之前的height：', line.height)
            if(Math.abs(line.height) >= 0 && Math.abs(line.height) <= 20) {
                
                if(obj.offsetTop > 0) {
                    console.log('offset大于零...')
                    this.offsetD20 = true;
                    // line.height = line.height - 20;
                    // line.top = line.top - Math.abs(line.height)
                } else {
                    this.offsetX20 = true;
                    console.log('offset小于零...')
                    // line.height = line.height + 20;
                    // line.top = line.top + Math.abs(line.height)
                }
                // line.height = line.height < 0 ? - Math.abs(obj.offsetTop) :  line.height;//Math.abs(obj.offsetTop) + 20; 
            } else {
                if(this.offsetD20) {
                    // line.height -= 20;
                    this.offsetD20 = false;
                    // line.top = line.top + 20
                }
                if(this.offsetX20) {
                    // line.height += 20;
                    this.offsetX20 = false;
                    // line.top = line.top - 20
                }
            }
            console.log('jianshu--：', obj.offsetTop - line.height)
            console.log('pre-top：', line.prevTop)
            console.log('prev-line-height：', line.prevHeight)
            console.log('line-height：', line.height)
            console.log('offsetTop：', obj.offsetTop)
            line.self = false;
            return line;
        });
        this.setState({
            drawLines: lines
        })
    }
    // 点击容器
    _onClickBody() {
        if(this.state.selectActive) {
            this.setState({
                selectActive: false
            })
        }
        if(this.props.graphClick)
            this.props.graphClick(null);
    }
    // 双击图形
    _onDoubleClick(g, e) {
        e.stopPropagation();
        if(g.lock) return ;
        if(this.props.graphDoubleClick) {
            this.props.graphDoubleClick(g);
            let elem = document.getElementById(`editor-graph-warp-editor-${g.id}`);
            elem.focus()
        }
    }
    // 监听点击
    _onClick(g, e) {
        e.stopPropagation()
        if(this.props.graphClick)
            this.props.graphClick(g);
    }
    _onSelectEnd() {
        let handles = this.selected.map(s => {
            let g = this.props.graphs.find(g => g.id === s.id);
            let p = this.positions.find(p => p.id === s.id);
            let prevP = this.selectPositions.find(p => p.id === s.id)
            return deepClone({type: 'edit'}, g, p, {
                prevLeft: prevP.left,
                prevTop: prevP.top,
                prevWidth: prevP.width,
                prevHeight: prevP.height,
                prevRotate: prevP.rotate
            });
        });
        this.props.addRecord(handles);
    }
    // 监听移动结束
    _onEnd(data, prevData) {
        let graph = this.props.graphs.find(g => g.id === data.id);
        let handle = deepClone({type: 'edit'}, graph, data, prevData);
        this.props.addRecord(handle);
        this.props.change && this.props.change(data);
        // 
        let lines = this.state.drawLines.filter(d => d.parent === data.id);
        lines = lines.map(line => {
            line.prevHeight = line.height;
            line.prevWidth = line.width;
            line.prevTop = line.top;
            return line;
        })
        this.selectPositions = [];
        this.setState({
            alignLines: [],
            drawLines: lines
        })
    }
    // 监听第一次加入的图形加载完毕
    _onLoadGraph(data) {
        this.props.change && this.props.change(data);
        let graph = this.props.graphs.find(g => g.id === data.id);
        this.props.handleStep < 0 && this.props.spliceRecord(this.props.handleStep);
        this.props.addRecord({type: 'add', ...graph});
        this.isLoad = true;
        this.props.setStep(0);
        this.props.change && this.props.change(data);
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
    // 监听输入
    _onEditorChange(e) {
        
    }
    _onEditorBlur(e) {
        let content = e.target.textContent;
        if(this.isLoad && !content) {
            this.isLoad = false;
            return ;
        }
        this.isLoad = false;
        let graph = this.props.graphs.find(g => g.id === this.props.active);
        this.props.addRecord({type: 'edit', ...graph, text: content, prevText: graph.text });
        graph.text = content;
        graph.prevText = graph.text;
        this.props.change && this.props.change(graph);
    }
    _onDrawBollMove({id, width, height}) {
        let drawLines = this.state.drawLines;
        let index = -1;
        let line = drawLines.find((d, i) => {
            index = i;
            return d.id === id
        });
        if(!line) return ;
        let top = line.top;
        if(height < 0) {
            top = line.firstTop + height;
        } else {
            top = line.firstTop
        }
        line = Object.assign({}, line, { width, height, prevHeight: height, prevWidth: width, top, prevTop: top, self: true })
        drawLines.splice(index, 1, line);
        this.setState({
            drawLines
        })
    }
    _onDrawBollDown({id, startX, startY, parent}) {
        let drawLines = this.state.drawLines;
        // let line = drawLines.find(d => d.id === id);
        // if(line) return ;
        let graph = this.props.graphs.find(g => g.id === parent);
        let top = graph.top + graph.height / 2 - 10;
        let left = graph.left + graph.width;
        drawLines.push({
            id,
            width: 0,
            height: 20,
            firstTop: top,
            // prevHeight: 
            top: top, 
            self: true,
            left,
            parent,
            zIndex: drawLines.length + 1
        })
        this.setState({
            drawLines
        })
    }
    componentDidMount() {
        this._event();
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove', this._onMouseMove)
        document.removeEventListener('mouseup', this._onMouseUp)
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
                isDraw, drawLines
            } = this.state;
        let { graphs, active, editing, scroll, width, height, warpWidth, warpHeight } = this.props;
        return (
            <div className={style.editorBox} onContextMenu={e => {
                e.preventDefault()
            }}>
                <Scroll center scroll={scroll}>
                    <div className={style.editorContainer} 
                        // onClick={this._onClickBody} 
                        style={{width: width + 'px', height: height + 'px'}}>
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
                                    style={{width: drawWidth, height: drawHeight, left: drawLeft, top: drawTop, zIndex: '9999999'}} />}
                            {/* 框选后的画框 */}
                            { selectActive && <Transform down={this._onTransformDown} 
                                        change={this._onSelectPosition}
                                        move={this._onTransformMove}
                                        end={this._onSelectEnd}
                                        click={e => e.stopPropagation()}
                                        select={true} width={selectWidth} height={selectHeight} 
                                        left={selectLeft} top={selectTop} 
                                        zIndex="9999999"
                                        x={selectX} y={selectY}
                                        active={selectActive} /> }
                            {/* 图形连线 */}
                            {
                                drawLines.map(line => <DrawLine key={line.id} {...line} />)
                            }
                            {/* 已有的图形列表 */}
                            {
                                graphs.map(g => {
                                    if(selectActive) 
                                        g.selected = !!this.selected.find(s => s.id === g.id);
                                    let { comp, selected, width, height, rotate, left, top, x, y, id, lock,  select, first, zIndex} = g;
                                    let Comp = comp;
                                    let aligns = g.align.split('-');
                                    return (<Transform change={this._onChange} 
                                                        load={this._onLoadGraph}
                                                        click={e => this._onClick(g, e)}
                                                        doubleClick={e => this._onDoubleClick(g, e)}
                                                        end={this._onEnd} 
                                                        active={active === id} 
                                                        down={this._onTransformDown} 
                                                        move={this._onTransformMove} 
                                                        key={id} selected={selected}
                                                        width={width} height={height}
                                                        rotate={rotate} left={left} top={top}
                                                        x={x} y={y} zIndex={zIndex}
                                                        id={id} lock={lock} select={select} first={first}
                                                        children={(w, h) => (
                                                            <>
                                                                {/* <DrawBoll parent={id} onDown={this._onDrawBollDown} onMove={this._onDrawBollMove} /> */}
                                                                {Comp && <Comp width={w} height={h} fill={g.backgroundColor} strokeDasharray={g.borderStyle} strokeWidth={g.borderSize}/>}
                                                                <div className={[style.editorGraphWarp, editing === id ? style.editing : ''].join(' ')} >
                                                                    <div id={`editor-graph-warp-editor-${id}`} 
                                                                            onInput={this._onEditorChange} 
                                                                            onClick={e => e.stopPropagation()} 
                                                                            onBlur={this._onEditorBlur}    
                                                                            onMouseDown={e => e.stopPropagation()}                                                                      
                                                                            style={{
                                                                                fontFamily: g.fontFamily,
                                                                                fontSize: g.fontSize,
                                                                                fontWeight: g.bold,
                                                                                color: g.fontColor,
                                                                                fontStyle: g.italics,
                                                                                textDecoration: g.underline,
                                                                                textAlign: aligns[0],
                                                                                verticalAlign: aligns[1]
                                                                            }}
                                                                            suppressContentEditableWarning
                                                                            className={style.editorGraphWarpEditor} 
                                                                            contentEditable={ editing === id ? true : false }>
                                                                                { g.text }
                                                                        </div>
                                                                </div>
                                                            </>
                                                        )} />
                                            )
                                })
                            }
                        </div>
                    </div>
                </Scroll>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        handleStep: state.handleRecord.step
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addRecord: handle => {
            dispatch(addRecord(handle))
        },
        spliceRecord: index => {
            dispatch(spliceRecord(index))
        },
        setStep: step => {
            dispatch(setStep(step))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor)