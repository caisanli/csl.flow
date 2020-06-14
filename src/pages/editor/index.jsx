// 编辑页面
import React, {useRef} from 'react';
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

        this.addGraph = this.addGraph.bind(this);
        // 属性
        this.eventOption = {
            moveDown: false,
            offsetTop: 0,
            offsetLeft: 0
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
    }
    onMouseMove(e) {
        if(!this.eventOption.moveDown)
            return ;
        e.preventDefault()
        let { offsetTop, offsetLeft } = this.eventOption;
        let {pageY, pageX} = e;
        this.setState({moveVisible: true})
        let moveElem = this.moveRef.current;
        if(moveElem) {
            let { offsetWidth, offsetHeight } = moveElem;
            let left = (pageX - offsetLeft) - (offsetWidth / 2);
            let top = (pageY - offsetTop) - (offsetHeight / 2);
            this.setState({
                moveX: left,
                moveY: top,
            })
        }
    }
    onMouseUp(e) {
        if(this.eventOption.moveDown) {
            this.setState({moveVisible: false})
            this.eventOption.moveDown = false;
            let {pageX, pageY} = e;
            let { moveGraph } = this.state;
            this.addGraph(moveGraph, pageX, pageY);
        }        
    }
    addGraph(graph, x, y) {
        let { graphs } = this.state;
        let id = Date.now();
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
                    </Scroll>
                </div>
                {/* 编辑区域 */}
                <div className={style.editorContainer} >
                    <Editor graphs={graphs} active={graphActive} draw={this.onDraw} />
                </div>
                {/* 浮动工具栏 */}
                <div className={style.editorRightAside}></div>
                {/* 移动时的图形 */}
                <Move ref={this.moveRef} y={moveY} x={moveX} graph={moveGraph} visible={moveVisible} />
              </div>
              
            </div>
        )
    }
}


