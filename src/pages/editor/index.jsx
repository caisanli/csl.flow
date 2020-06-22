// 编辑页面
import React from 'react';
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
import { getOffset } from '@utils/index';
// import Text from '@comp/Graph/base/Text';
/**
 * 整体布局：
 * 1、上方工具栏
 * 2、左侧边栏图形选择栏
 * 3、中间操作区域
 * 4、右侧小工具栏
 */
export default class EditorBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailY: 0,
            detailVisible: false,
            detailGraph: null,
            moveX: 0,
            moveY: 0,
            moveGraph: null,
            moveVisible: false,
            graphActive: 0, // 
            graphs: [], // 已添加图形
        }
        // ref
        this.asideRef = React.createRef();
        this.contentRef = React.createRef();
        this.moveRef = React.createRef();
        // 绑定方法
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onDraw = this.onDraw.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addGraph = this.addGraph.bind(this);
        // 属性
        this.temporary = null; // 记个临时的图形
        this.eventOption = {
            moveDown: false,
            asideWidth: 0,
            offsetTop: 0,
            offsetLeft: 0,
            isOutSide: false
        };
    }
    componentDidMount() {
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
        if(moveElem) {
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
    }
    onMouseUp(e) {
        if(!this.eventOption.moveDown) return;

        this.setState({moveVisible: false})
        this.eventOption.moveDown = false;
        if(this.eventOption.isOutSide) {
            this.eventOption.isOutSide = false;
            this.temporary = null;
        } else {
            let graphs = this.state.graphs.filter(g => g.id !== this.temporary);
            this.setState({
                graphs
            })
            this.temporary = null;
        }      
    }
    addGraph(graph, x, y, id = Date.now()) {
        let { graphs } = this.state;
        graphs.push(Object.assign({}, graph, {x, y, id} ));
        this.setState({ graphs, graphActive: id });
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
    onChange(g) {
        this.setState({
            graphActive: g ? g.id : null
        })
    }
    onSelectChange(obj, positions) {
        let graphs = this.state.graphs.map(g => {
            let p = positions.find(p => p.id === g.id)
            if(!p) return g;
            g.left = p.left;
            g.top = p.top;
            g.rotate = p.rotate;
            return g;
        });
        console.log(graphs)
        this.setState({
            graphs
        })
        // console.log(selected);
        //console.log(obj);
    }
    // 监听画框
    onDraw(data) {
        // console.log(data);
    }
    render() {
        let { detailY, detailVisible, detailGraph, moveX, moveY, moveVisible, moveGraph, graphs, graphActive } = this.state;
        return (
            <div className={style.editorBox}>
              {/* 工具栏 */}
              <div className={style.editorTools}>
                <ToolBar />
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
                <div className={style.editorContainer} >
                    <Editor graphs={graphs} 
                            selectChange={this.onSelectChange}
                            active={graphActive} 
                            change={this.onChange} 
                            draw={this.onDraw} />
                </div>
                {/* 浮动工具栏 */}
                <div className={style.editorRightAside}></div>
               
              </div>
              
            </div>
        )
    }
}


