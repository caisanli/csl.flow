// 编辑页面
import React from 'react';
import style from "./index.module.less";
// 组件
import ToolBar from '@comp/ToolBar';
import Scroll from '@comp/Scroll';
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
                    <div style={{height: 7000+'px'}}></div>
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