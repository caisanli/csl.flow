import React from 'react';

import Scroll from '@comp/Scroll';
import { Collapse, Panel } from "@comp/Collapse";

// 图形组件
import bases from '@comp/Graph/base';
import flows from '@comp/Graph/flow';
import Detail from '@comp/Graph/Detail';
import Move from '@comp/Graph/Move';
import Thumbnail from '@comp/Graph/Thumbnail';

// 工具
import { getOffset } from '@assets/js/utils';

// 样式
import style from './index.module.less';

export default class Aside extends React.Component {
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
            mouseup: false,
        }
        // ref
        this.asideRef = React.createRef();
        this.moveRef = React.createRef();
        // 绑定方法
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        // 属性
        this.temporary = null; // 记个临时的图形
        this.eventOption = {
            moveDown: false,
            asideWidth: 0,
            offsetTop: 0,
            offsetLeft: 0,
            isOutSide: false,
        };
    }
    onMouseDown(g) {
        this.eventOption.moveDown = true;
        this.setState({
            moveGraph: g
        })
        let elem = this.asideRef.current;
        let { top, left } = getOffset(elem);
        this.eventOption.offsetLeft = left;
        this.eventOption.offsetTop = top;
        this.eventOption.asideWidth = elem.offsetWidth;
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
            this.props.onAdd && this.props.onAdd(this.state.moveGraph, pageX, pageY, this.temporary);
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
            this.props.onDelete && this.props.onDelete(this.temporary);
            this.temporary = null;
        } 
        setTimeout(() => {
            this.setState({mouseup: false});
        }, 100)     
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
    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }
    render() {
        let { 
            detailY, detailVisible, detailGraph, 
            moveX, moveY, moveVisible, moveGraph 
        } = this.state;
        return (
            <div className={style.aside} ref={this.asideRef}>
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
                            <Thumbnail graphs={flows}
                                        enter={this.onMouseEnter} 
                                        leave={this.onMouseLeave}
                                        mouseDown={this.onMouseDown}/>
                        </Panel>
                    </Collapse>
                        {/* 移动时的图形 */}
                    <Move ref={this.moveRef} y={moveY} x={moveX} graph={moveGraph} visible={moveVisible} />
                </Scroll>
            </div>
        )
    }
}