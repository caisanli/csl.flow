// 编辑页面
import React from 'react';
import style from "./index.module.less";
// 组件
import ToolBar from '@comp/ToolBar';
import Scroll from '@comp/Scroll';
import { Collapse, Panel } from "@comp/Collapse";
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
export default function() {
    return (
        <div className={style.editorBox}>
          {/* 工具栏 */}
          <div className={style.editorTools}>
            <ToolBar />
          </div>
          {/* 容器 */}
          <div className={style.editorContent}>
            {/* 图形选择栏 */}
            <div className={style.editorLeftAside}>
                <Scroll visible={false}>
                    <Collapse defaultActiveKeys={['1']}>
                        <Panel header={'基础图形'} key={'1'}>
                            {
                                Bases.map((b, i) => <Graph key={i} Comp={b.Comp} />)
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
            <div className={style.editorWarp}></div>
            {/* 浮动工具栏 */}
            <div className={style.editorRightAside}></div>
          </div>
        </div>
    )
}
function Graph(props) {
    return (
        <div className={style.graph}>
            <props.Comp width={40} height={40} strokeWidth={30} />
        </div>
    )
}