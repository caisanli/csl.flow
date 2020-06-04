// 编辑页面
import React, {useRef} from 'react';
import style from "./index.module.less";
// 组件
import ToolBar from '@comp/ToolBar';
import Scroll from '@comp/Scroll';
import { Collapse, Panel } from "@comp/Collapse";
import Editor from "@comp/Editor";
// 图形组件
import Bases from '@comp/Graph/base';

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
            isDetail: false,
            detailGraph: null
        }
        // ref
        this.asideRef = React.createRef();
        // 绑定方法
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }
    onMouseEnter(e, graph) {
        this.setState({
            detailY: e.pageY,
            detailVisible: true,
            detailGraph: graph
        });
    }
    onMouseLeave() {
        this.setState({
            detailVisible: false
        })
    }
    render() {
        return (
            <div className={style.editorBox}>
              {/* 工具栏 */}
              <div className={style.editorTools}>
                <ToolBar />
              </div>
              {/* 容器 */}
              <div className={style.editorContent}>
                {/* 图形选择栏 */}
                <div className={style.editorLeftAside} ref={this.asideRef}>
                    <GraphDetail y={this.state.detailY} graph={this.state.detailGraph} visible={this.state.detailVisible}/>
                    <Scroll>
                        <Collapse defaultActiveKeys={['1']}>
                            <Panel header={'基础图形'} key={'1'}>
                                {
                                    Bases.map(
                                        (b, i) => <Graph enter={(e) => this.onMouseEnter(e, b)} 
                                                            leave={this.onMouseLeave} 
                                                            key={i} 
                                                            comp={b.comp} />
                                    )
                                }
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
                <div className={style.editorWarp}>
                    <Editor />
                </div>
                {/* 浮动工具栏 */}
                <div className={style.editorRightAside}></div>
              </div>
            </div>
        )
    }
}
// 图形缩略图
function Graph(props) {
    let { enter, leave, comp } = props;
    let Comp = comp;
    return (
        <div className={style.graph} onMouseEnter={enter} onMouseLeave={leave}>
            <Comp width={40} height={40} strokeWidth={30} />
        </div>
    )
}

// 图形详情
function GraphDetail(props) {
    let { y, visible, graph } = props;
    if(!visible) return null;
    let Comp = graph.comp;
    let title = graph.title;
    let top = getDetailTop(y);
    return (
        <div className={style.graphDetailBox} style={{top: top + 'px'}}>
            <div className={style.graphDetailContent}>
                <div className={style.graphDetailSvg}>
                    <Comp width={120} height={90} strokeWidth={15} stroke={'#244462'}/>
                </div>
                <p className={style.graphDetailTitle}>{title}</p>
            </div>
        </div>
    )
}
// 获取图形详情top值
function getDetailTop(y) {
    let bh = document.body.offsetHeight;
    let eh = 142;
    let top = y - eh / 2;
    top = top + eh / 2 > bh ? bh - eh : top < 0 ? 0 : top;
    return top;
}