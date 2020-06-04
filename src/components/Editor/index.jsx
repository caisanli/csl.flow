// 编辑框
import React from 'react';
// 组件
import Scroll from '@comp/Scroll';
// 样式
import style from './index.module.less';
export default class Editor extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let width = 1000 + 'px';
        let height = 800 + 'px'
        return (
            <div className={style.editorBox} >
                <Scroll>
                    <div className={style.editorContainer}>
                        <div className={style.editorWarp} style={{width, height}}></div>
                    </div>
                </Scroll>
            </div>
        );
    }
}