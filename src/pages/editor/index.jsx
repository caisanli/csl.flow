// 编辑页面
import React from 'react';
import { connect } from 'react-redux';
// actions
import { setStep, addRecord } from '@/actions/handleRecord';
// 样式
import style from "./index.module.less";
// 组件
import ToolBar from '@comp/ToolBar';
import Scroll from '@comp/Scroll';
import { Collapse, Panel } from "@comp/Collapse";
import Editor from "@comp/Editor";
// 图形组件
import bases from '@comp/Graph/base';
import Detail from '@comp/Graph/Detail';
import Move from '@comp/Graph/Move';
import Thumbnail from '@comp/Graph/Thumbnail';
// 工具
import { getOffset, deepClone } from '@utils/index';
// import Text from '@comp/Graph/base/Text';
/**
 * 整体布局：
 * 1、上方工具栏
 * 2、左侧边栏图形选择栏
 * 3、中间操作区域
 * 4、右侧小工具栏
 */
class EditorBox extends React.Component {
    constructor(props) {
        super(props);
        let width = 4000, height = 4000, warpHeight = 1200, warpWidth = 1500;
        this.state = {
            detailY: 0,
            detailVisible: false,
            detailGraph: null,
            moveX: 0,
            moveY: 0,
            moveGraph: null,
            moveVisible: false,
            mouseup: false,
            graphActive: 0, // 
            graphEditing: 0,
            graphs: [], // 已添加图形
            width ,
            height ,
            warpWidth ,
            warpHeight
        }
        // ref
        this.asideRef = React.createRef();
        this.contentRef = React.createRef();
        this.moveRef = React.createRef();
        this.editorRef = React.createRef();
        // 绑定方法
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onDraw = this.onDraw.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClickGraph = this.onClickGraph.bind(this);
        this.onDoubleClickGraph = this.onDoubleClickGraph.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onClickTool = this.onClickTool.bind(this);
        this.getRelativePoint = this.getRelativePoint.bind(this);
        this.getPagePosition = this.getPagePosition.bind(this);
        this.onGraphChange = this.onGraphChange.bind(this);
        // this.addGraph = this.addGraph.bind(this);
        // 属性
        this.temporary = null; // 记个临时的图形
        this.eventOption = {
            moveDown: false,
            asideWidth: 0,
            offsetTop: 0,
            offsetLeft: 0,
            isOutSide: false,
        };
        
        this.editorOption = {
            scrollTop: 0, // 当前scrollTop
            scrollLeft: 0, // 当前scrollLeft
            offsetTop: 0, // 容器offsetTop
            offsetLeft: 0, // 容器offsetLeft
            distanceTop: (height - warpHeight) / 2 , // 编辑区域离容器的top
            distanceLeft: (width - warpWidth) / 2 // 编辑区域离容器的left
        }
    }
    // 获取offset
    getOffset(elem) {
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
    // 计算相对坐标位置
    getRelativePoint(x, y) { 
        let { offsetLeft, offsetTop, scrollLeft, scrollTop, distanceLeft, distanceTop } = this.editorOption;
        return {
            top: y - offsetTop - (distanceTop - scrollTop),
            left: x - offsetLeft - (distanceLeft - scrollLeft)  
        };
    }
    // 根据left top获取x y坐标
    getPagePosition(left, top) {
        let { offsetLeft, offsetTop, scrollLeft, scrollTop, distanceLeft, distanceTop } = this.editorOption;
        let y = offsetTop + (distanceTop - scrollTop) + top;
        let x = offsetLeft + (distanceLeft - scrollLeft) + left;
        return {x, y}
    }
    componentDidMount() {
        let offset = this.getOffset(this.editorRef.current);
        this.editorOption.offsetLeft = offset.left;
        this.editorOption.offsetTop = offset.top;
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }
    onMouseDown(g) {
        this.eventOption.moveDown = true;
        this.setState({
            moveGraph: g
        })
        let elem = this.contentRef.current;
        let { top, left } = getOffset(elem);
        this.eventOption.offsetLeft = left;
        this.eventOption.offsetTop = top;
        this.eventOption.asideWidth = this.asideRef.current.offsetWidth;
    }
    onMouseMove(e) {
        if(!this.eventOption.moveDown)
            return ;
        e.preventDefault()
        let { offsetTop, offsetLeft, asideWidth } = this.eventOption;
        let {pageY, pageX} = e;
        this.setState({moveVisible: true})
        let moveElem = this.moveRef.current;
        if(!moveElem) return;
        
        let { offsetWidth, offsetHeight } = moveElem;
        let left = (pageX - offsetLeft) - (offsetWidth / 2);
        let top = (pageY - offsetTop) - (offsetHeight / 2);
        if(left + 20 >= asideWidth) {
            if(this.temporary) return ;
            this.temporary = Date.now();
            this.eventOption.isOutSide = true;
            this.addGraph(this.state.moveGraph, pageX, pageY, this.temporary);
        } else {
            this.eventOption.isOutSide = false;
        }
        this.setState({
            moveX: left,
            moveY: top,
        })
        
    }
    onMouseUp() {
        this.setState({mouseup: true})
        if(!this.eventOption.moveDown) return;
        this.setState({moveVisible: false})
        this.eventOption.moveDown = false;
        if(this.eventOption.isOutSide) {
            this.eventOption.isOutSide = false;
            this.temporary = null;
        } else {
            this.deleteGraph(this.temporary);
            this.temporary = null;
        } 
        setTimeout(() => {
            this.setState({mouseup: false});
        }, 100)     
    }
    deleteGraph(id) {
        let graphs = this.state.graphs.filter(g => g.id !== id);
        this.setState({ graphs });
    }
    addGraph(graph, x, y, id = Date.now()) {
        let { graphs } = this.state;
        let position = this.getRelativePoint(x, y);
        graphs.push(Object.assign({}, graph, { x, y, id, first: true }, { ...position } ));
        this.setState({ graphs, graphActive: id, graphEditing: id });
    }
    // 监听图形改变
    onGraphChange(data) {
        this.setGraph(data);
    }
    // 设置某个图形
    setGraph(data) {
        let graphs = [...this.state.graphs];
        let index = -1;
        let g = graphs.find((g, i) => {
            index = i;
            return g.id === data.id;
        });
        if(!g) return ;
        g.first = false;
        let newGraph = Object.assign({}, g, data);
        graphs.splice(index, 1, newGraph);
        this.setState({ graphs })
    }
    onMouseEnter(graph, e) {
        this.setState({
            detailY: e.pageY,
            detailVisible: true,
            detailGraph: graph
        });
    }
    onMouseLeave() {
        this.setState({
            detailVisible: false
        });
    }
    // 点击图形
    onClickGraph(g) {
        this.setState({
            graphActive: g ? g.id : null,
            graphEditing: null
        })
    }
    // 点击工具栏
    onClickTool({ value }) {
        switch(value) {
            case 'revoke': // 撤回
                this.revoke();
                break;
            case 'recovery': // 恢复
                this.recovery();
                break;
        }
    }
    // 恢复
    recovery() {
        let { handleStep, handleRecords } = this.props;
        let record = null;
        if(handleStep >= 0) {
            alert('您不能再恢复了');
            return ;
        }
        let newStep = handleStep + 1;
        if(handleStep === -1) {
            record = handleRecords.slice(handleStep)[0];
        } else {
            record = handleRecords.slice(handleStep, newStep)[0];
        }
        
        if(!record) return ;
        record = {...record};
        switch(record.type) {
            case 'add':
                delete record.type;
                console.log([...this.state.graphs, record])
                this.setState({
                    graphs: [...this.state.graphs, record]
                })
                break ;
            case 'edit':
                this.setGraph({
                    id: record.id,
                    left: record.left,
                    top: record.top,
                    width: record.width,
                    height: record.height,
                    rotate: record.rotate
                });
                break ;
            case 'delete':
                this.deleteGraph(record.id);
                break ;
        }
        if(newStep === 0) {
            alert('到头了...');
        }
        console.log('newStep：', newStep)
        this.props.setStep(newStep);
    }
    // 撤回
    revoke() {
        let { handleStep, handleRecords } = this.props;
        if(Math.abs(handleStep) >= handleRecords.length) {
            alert('您不能再撤回了...');
            return ;
        }
        let record = null;
        let newStep = handleStep - 1;
        
        if(newStep === -1) {
            record = handleRecords.slice(newStep)[0];
        } else {
            record = handleRecords.slice(newStep, handleStep)[0];
        }
        if(!record) return ;
        record = {...record};
        switch(record.type) {
            case 'add':
                this.deleteGraph(record.id);
                break;
            case 'edit':
                this.setGraph({
                    id: record.id,
                    left: record.prevLeft,
                    top: record.prevTop,
                    width: record.prevWidth,
                    height: record.prevHeight,
                    rotate: record.prevRotate
                });
                break;
            case 'delete':
                delete record.type;
                this.setState({
                    graphs: [...this.state.graphs, record]
                })
                break;
        }
        console.log(newStep)
        //if(this.props.)
        if(Math.abs(newStep) === handleRecords.length) {
            alert('到尽头了...');
            // newStep = 0;
        }
        this.props.setStep(newStep);
        console.log(record)
    }
    // 双击图形
    onDoubleClickGraph(g) {
        this.setState({
            graphEditing: g ? g.id : null
        })
    }
    onSelectChange(obj, positions) {
        let graphs = this.state.graphs.map(g => {
            let p = positions.find(p => p.id === g.id)
            if(!p) return g;
            g.left = p.left;
            g.top = p.top;
            g.rotate = p.rotate;
            g.width = p.width;
            g.height = p.height;
            return g;
        });
        this.setState({
            graphs
        })
    }
    onDelete(id) {
        let graphs = this.state.graphs.filter(g => g.id !== id);
        this.setState({ graphs, active: null, editing: null })
    }
    // 监听画框
    onDraw(data) {
        // console.log(data);
    }
    onScroll(left, top) {
        this.editorOption.scrollTop = top;
        this.editorOption.scrollLeft = left;
    }
    render() {
        let { detailY, detailVisible, detailGraph, 
                moveX, moveY, moveVisible, moveGraph, 
                graphs, graphActive, width, height, warpHeight, warpWidth,
                graphEditing, mouseup
            } = this.state;
        return (
            <div className={style.editorBox}>
              {/* 工具栏 */}
              <div className={style.editorTools}>
                <ToolBar click={this.onClickTool} />
              </div>
              {/* 容器 */}
              <div className={style.editorContent} ref={this.contentRef}>
                {/* 图形选择栏 */}
                <div className={style.editorLeftAside} ref={this.asideRef}>
                    <Detail y={detailY} graph={detailGraph} visible={detailVisible}/>
                    <Scroll>
                        <Collapse defaultActiveKeys={['1']}>
                            <Panel header={'基础图形'} key={'1'}>
                                <Thumbnail graphs={bases}
                                            enter={this.onMouseEnter} 
                                            leave={this.onMouseLeave}
                                            mouseDown={this.onMouseDown}/>
                            </Panel>
                            <Panel header={'FlowChart流程图'} key={'2'}>
                                <p>这是内容01</p>
                            </Panel>
                            <Panel header={'EVC企业价值链'} key={'3'}>
                                <p>这是内容01</p>
                            </Panel>
                        </Collapse>
                         {/* 移动时的图形 */}
                        <Move ref={this.moveRef} y={moveY} x={moveX} graph={moveGraph} visible={moveVisible} />
                    </Scroll>
                </div>
                {/* 编辑区域 */}
                <div className={style.editorContainer} ref={this.editorRef}>
                    <Editor width={width}
                            height={height}
                            warpWidth={warpWidth}
                            warpHeight={warpHeight}
                            graphs={graphs} 
                            mouseup={mouseup}
                            selectChange={this.onSelectChange}
                            getPagePosition={this.getPagePosition}
                            getRelativePoint={this.getRelativePoint}
                            scroll={this.onScroll}
                            active={graphActive} 
                            editing={graphEditing}
                            delete={this.onDelete}
                            graphClick={this.onClickGraph} 
                            graphDoubleClick={this.onDoubleClickGraph}
                            change={this.onGraphChange}
                            draw={this.onDraw} />
                </div>
                {/* 浮动工具栏 */}
                <div className={style.editorRightAside}></div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        handleRecords: state.handleRecord.records,
        handleStep: state.handleRecord.step
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStep: step => {
            dispatch(setStep(step))
        },
        addRecord: handle => {
            dispatch(addRecord(handle))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorBox)
