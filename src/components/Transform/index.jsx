// 转换组件
import React from 'react';
// 样式
import style from './index.module.less';

export default class Transform extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        // state
        this.state = {
            width: 0, 
            height: 0,
            left: props.left,
            top: props.top,
            rotate: 0 
        }
        // 事件
        this._event = this._event.bind(this);
        this._cleanEvent = this._cleanEvent.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        // 方法
        this._atan2 = this._atan2.bind(this);
        // 属性
        this.eventOption = {
            isDown: false,
            type: '', // 操作类型
            startX: 0,
            startY: 0,
        }
    }
    _onMouseDown(e) {
        console.log(e);
    }
    _onMouseMove(e) {
        if(this.eventOption.isDown) return;
        
    }
    // 旋转
    _rotateMouseMove(e) {
        let x = e.pageX, y = e.pageY;
        let origin = {x: 25, y: 25};
        x = x - origin.x;
        y = origin.y - y;
        this._atan2(y, x);
    }
    _atan2(y, x) {
        let degree = Math.atan2(y,x) / (Math.PI / 180);
        degree = -degree; 
        $warp.style.transform = 'rotate('+ degree +'deg)';
    }
    _onMouseUp() {
        if(this.eventOption.isDown)
            this.eventOption.isDown = false;
    }
    componentDidMount() {
        this._event();
    }
    componentWillUnmount() {
        this._cleanEvent();
    }
    render() {
        let { width, height, rotate, left, top } = this.state;
        let Comp = this.props.comp;
        return (
            <div className={style.transformBox} 
                style={{width, height, transform: `translate(${left}px,${top}px) rotate(${rotate}deg)`}}>
                <div className={style.transformBody}>
                    {/* 操作按钮 */}
                    <div className={style.transformTools}>
                        <span onMouseDown={this._onMouseDown} data-type="rotate" className={[style.transformTool, style.rotate]}></span>
                        <span onMouseDown={this._onMouseDown} data-type="lt" className={[style.transformTool, style.lt]}></span>
                        <span onMouseDown={this._onMouseDown} data-type="rt" className={[style.transformTool, style.rt]}></span>
                        <span onMouseDown={this._onMouseDown} data-type="lb" className={[style.transformTool, style.lb]}></span>
                        <span onMouseDown={this._onMouseDown} data-type="rb" className={[style.transformTool, style.rb]}></span>
                    </div>
                    <Comp />
                    {this.props.children}
                </div>
            </div>
        );
    }
    _event() {
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('mousemove', this._onMouseUp);
    }
    _cleanEvent() {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mousemove', this._onMouseUp);
    }
}