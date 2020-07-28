// 编辑页面
import React from 'react';
import { connect } from 'react-redux';
// actions
import { setStep, addRecord } from '@/actions/handleRecord';
// 样式
import style from "./index.module.less";
// 组件
import ToolBar from '@comp/ToolBar';
import Editor from "@comp/Editor";
import Aside from '@comp/Aside';
// 工具
import { getOffset, interObject, deepClone } from '@assets/js/utils';
// 图形
import graphObj, { defaultStyle } from '@assets/js/graph';
/**
 * 整体布局：
 * 1、上方工具栏
 * 2、左侧边栏图形选择栏
 * 3、中间操作区域
 * 4、右侧小工具栏
 */
 const graphDisabled = ['fontFamily', 'fontSize', 'bold', 'italics', 'underline', 'fontColor', 
 'align', 'backgroundColor', 'borderSize', 'borderStyle', 'top', 'bottom', 'link', 'lock'];
 const lineDisabled = ['connectType', 'connectStart', 'connectEnd']
class EditorBox extends React.Component {
    constructor(props) {
        super(props);
        let width = 4000, height = 4000, warpHeight = 1200, warpWidth = 1500;
        this.state = {
            graphActive: 0, // 
            graphEditing: 0,
            styleObj: defaultStyle,
            graphs: [], // 已添加图形
            width ,
            height ,
            warpWidth ,
            warpHeight,
            disabled: ['revoke', 'recovery', 'format', ...graphDisabled, ...lineDisabled], // 禁用工具栏列表
        }
        // ref
        this.contentRef = React.createRef();
        this.editorRef = React.createRef();
        // 绑定方法
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
        this.addGraph = this.addGraph.bind(this);
        // 属性
        this.editorOption = {
            scrollTop: 0, // 当前scrollTop
            scrollLeft: 0, // 当前scrollLeft
            offsetTop: 0, // 容器offsetTop
            offsetLeft: 0, // 容器offsetLeft
            distanceTop: (height - warpHeight) / 2 , // 编辑区域离容器的top
            distanceLeft: (width - warpWidth) / 2 // 编辑区域离容器的left
        }
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
        let offset = getOffset(this.editorRef.current);
        this.editorOption.offsetLeft = offset.left;
        this.editorOption.offsetTop = offset.top;
    }
    // 添加图形
    addGraph(graph, x, y, id = Date.now()) {
        let { graphs } = this.state;
        let position = this.getRelativePoint(x, y);
        let zIndex = graphs.length ? graphs[graphs.length - 1].zIndex + 1 : 1;
        let newGraph = Object.assign({}, graphObj, graph, { x, y, id, zIndex }, { ...position })
        graphs.push(newGraph);
        let disabled = this.state.disabled;
        disabled = disabled.filter(d => !graphDisabled.includes(d))
        this.setState({ graphs, graphActive: id, graphEditing: id, disabled, styleObj: deepClone(defaultStyle) });
    }
    // 删除图形
    deleteGraph(id) {
        let graphs = this.state.graphs.filter(g => g.id !== id);
        let disabled = [...new Set([...this.state.disabled, ...graphDisabled])]
        this.setState({ graphs, active: null, editing: null, disabled })
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
    // 点击图形
    onClickGraph(g) {
        setTimeout(() => {
            let disabled = this.state.disabled, id = null;
            let style = defaultStyle;
            if(g) {
                style = interObject(style, g);
                disabled = disabled.filter(d => !graphDisabled.includes(d))
                id = g.id;
            } else {
                disabled = [...new Set([...disabled, ...graphDisabled])]
            }
            this.setState({
                styleObj: style,
                disabled,
                graphActive: id,
                graphEditing: null
            })
        }, 0)
    }
    // 点击工具栏
    onClickTool(type, value) {
        console.log('type：', type)
        console.log('value：', value)
        let graphs = this.state.graphs
        let graph = graphs.find(g => g.id === this.state.graphActive);
        let {align, backgroundColor, borderSize, borderStyle, bold, fontColor, fontFamily, fontSize, italics, lock, underline, unlock, zIndex} = interObject(defaultStyle, graph);
        let prevGraphStyle = {
            prevAlign: align,
            prevBackgroundColor: backgroundColor,
            prevBorderSize: borderSize,
            prevBorderStyle: borderStyle,
            prevBold: bold,
            prevFontColor: fontColor,
            prevFontFamily: fontFamily,
            prevFontSize: fontSize,
            prevItalics: italics,
            prevLock: lock,
            prevUnderline: underline,
            prevUnlock: unlock,
            prevZIndex: zIndex
        }
        switch(type) {
            case 'revoke': // 撤回
                this.revoke();
                return ;
            case 'recovery': // 恢复
                this.recovery();
                return ;
            case 'bold': // 加粗
                graph.bold = value;
                break;
            case 'fontFamily': 
                graph.fontFamily = value;
                break;
            case 'fontSize':
                graph.fontSize = value;
                break;
            case 'italics':
                graph.italics = value;
                break;
            case 'underline':
                graph.underline = value;
                break;
            case 'fontColor':
                graph.fontColor = value;
                break;
            case 'align':
                graph.align = value;
                break;
            case 'backgroundColor':
                graph.backgroundColor = value;
                break;
            case 'borderSize':
                graph.borderSize = value;
                break;
            case 'borderStyle':
                graph.borderStyle = value;
                break;
            case 'top':
                graph.zIndex = graphs.length ? graphs[graphs.length - 1].zIndex + 1 : graph.zIndex;
                break;
            case 'bottom':
                this.setGraphToBottom(graph);
                break;
            case 'lock':
                graph.lock = value;
                break;
        }
        let style = interObject(defaultStyle, graph);
        this.setState({styleObj: style});
        this.props.addRecord({type: 'edit', ...graph, ...prevGraphStyle});
        this.setGraph(graph);
    }
    // 置底
    setGraphToBottom(g) {
        let graphs = this.state.graphs;
        graphs = graphs.map((graph, i) => {
            if(g.id !== graph.id) {
                graph.zIndex = (i + 1) + 1;
            } else {
                graph.zIndex = 1;
            }
            return graph;
        })
        this.setState({
            graphs
        })
    }
    // 恢复
    recovery() {
        let { handleStep, handleRecords } = this.props;
        let record = null;
        let newStep = handleStep + 1;
        if(handleStep === -1) {
            record = handleRecords.slice(handleStep)[0];
        } else {
            record = handleRecords.slice(handleStep, newStep)[0];
        }
        
        if(!record) return ;
        this.props.setStep(newStep);
        record = {...record};
        switch(record.type) {
            case 'add':
                // delete record.type;
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
                    rotate: record.rotate,
                    align: record.align,
                    backgroundColor: record.backgroundColor,
                    bold: record.bold,
                    borderSize: record.borderSize,
                    borderStyle: record.borderStyle,
                    fontColor: record.fontColor,
                    fontFamily: record.fontFamily,
                    fontSize: record.fontSize,
                    italics: record.italics,
                    lock: record.lock,
                    underline: record.underline,
                    unlock: record.unlock,
                    zIndex: record.zIndex,
                    text: record.text
                });
                break ;
            case 'delete':
                this.deleteGraph(record.id);
                break ;
        }
    }
    // 撤回
    revoke() {
        let { handleStep, handleRecords } = this.props;
        let record = null;
        let newStep = handleStep - 1;
        
        if(newStep === -1) {
            record = handleRecords.slice(newStep)[0];
        } else {
            record = handleRecords.slice(newStep, handleStep)[0];
        }
        if(!record) return ;
        this.props.setStep(newStep);
        record = {...record};
        switch(record.type) {
            case 'add':
                this.deleteGraph(record.id);
                break;
            case 'edit':
                this.setGraph({
                    id: record.id,
                    left: record.prevLeft || record.left,
                    top: record.prevTop || record.top,
                    width: record.prevWidth || record.width,
                    height: record.prevHeight || record.height,
                    rotate: record.prevRotate || record.rotate,
                    align: record.prevAlign || record.align,
                    backgroundColor: record.prevBackgroundColor || record.backgroundColor,
                    bold: record.prevBold || record.bold,
                    borderSize: record.prevBorderSize || record.borderSize,
                    borderStyle: record.prevBorderStyle || record.borderStyle,
                    fontColor: record.prevFontColor || record.fontColor,
                    fontFamily: record.prevFontFamily || record.fontFamily,
                    fontSize: record.prevFontSize || record.fontSize,
                    italics: record.prevItalics || record.italics,
                    lock: record.prevLock || record.lock,
                    underline: record.prevUnderline || record.underline,
                    unlock: record.prevUnlock || record.unlock,
                    zIndex: record.prevZIndex || record.zIndex,
                    text: record.prevText || ''
                });
                break;
            case 'delete':
                delete record.type;
                this.setState({
                    graphs: [...this.state.graphs, record]
                })
                break;
        }
    }
    // 双击图形
    onDoubleClickGraph(g) {
        setTimeout(() => {
            this.setState({
                graphEditing: g ? g.id : null
            })
        }, 100);
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
    // 监听删除图形
    onDelete(id) {
        this.deleteGraph(id)
    }
    // 监听画框
    onDraw(data) {
        // console.log(data);
    }
    onScroll(left, top) {
        this.editorOption.scrollTop = top;
        this.editorOption.scrollLeft = left;
    }
    shouldComponentUpdate(nextProps) {
        if(
            nextProps.handleRecords.length !== this.props.handleRecords.length 
            || nextProps.handleStep !== this.props.handleStep
        ) {
            let disabled = this.state.disabled;
            if(Math.abs(nextProps.handleStep) >= nextProps.handleRecords.length) {
                !disabled.includes('revoke') && disabled.push('revoke')                
            } else {
                disabled = disabled.filter(d => d !== 'revoke')
            }
            if(nextProps.handleStep >= 0) {
                !disabled.includes('recovery') && disabled.push('recovery')
            } else {
                disabled = disabled.filter(d => d !== 'recovery')
            }
            this.setState({
                disabled
            })
        }
        return true;
    }
    render() {
        let { graphs, graphActive, width, height, warpHeight, warpWidth,
                graphEditing, mouseup, disabled, styleObj
            } = this.state;
        return (
            <div className={style.editorBox}>
              {/* 工具栏 */}
              <div className={style.editorTools}>
                <ToolBar disabled={disabled} styleObj={styleObj} onClick={this.onClickTool} />
              </div>
              {/* 容器 */}
              <div className={style.editorContent} ref={this.contentRef}>
                {/* 图形选择栏 */}
                <div className={style.editorLeftAside}>
                    <Aside onDelete={this.onDelete} onAdd={this.addGraph} />
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
