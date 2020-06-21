// 转换组件
import React from 'react';
// 样式
import style from './index.module.less';

export default class Transform extends React.Component {
    constructor(props) {
        super(props);
        let select = props.select;
        const baseWidth = props.width || 140;
        const baseHeight = props.height || 140;
        console.log('生成图形：', props)
        // state
        this.state = {
            width: baseWidth, 
            height: baseHeight,
            left: select ? props.left : props.left ,//- baseWidth / 2,
            top: select ? props.top : props.top, // - baseHeight / 2,
            rotate: props.rotate || 0 
        }
        if(props.change)
            props.change(Object.assign({}, this.state, {id: props.id, offsetTop: 0, offsetLeft: 0}))
        // 事件
        this._event = this._event.bind(this);
        this._cleanEvent = this._cleanEvent.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        // 方法
        this._atan2 = this._atan2.bind(this);
        // 属性
        this.isFirst = select ? false : true;
        // 事件变量
        this.eventOption = {
            isDown: false,
            type: '', // 操作类型
            startX: 0,
            startY: 0,
            startW: baseWidth, // 起始宽度
            startH: baseHeight, // 起始高度
            startTop: 0, // 起始top
            startLeft: 0, // 起始left
            x: props.x, // 记录当前x坐标
            y: props.y // 记录当前y坐标
        }
        // 变化中的偏移量
        this.offset = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            rotate: 0
        }
    }
    _onMouseDown(e) {
        e.stopPropagation();
        let elem = e.currentTarget;
        let type = elem.getAttribute('data-type');
        if(!type) return ;
        let downFn = this.props.down;
        let { left, top } = this.state;
        if(!downFn) return ;
        let {x, y, startX, startY} = downFn(left, top, e);
        this.eventOption.x = x;
        this.eventOption.y = y;
        this.eventOption.startX = startX;
        this.eventOption.startY = startY;
        this.eventOption.isDown = true;
        this.eventOption.type = type;
        this.eventOption.startW = this.state.width;
        this.eventOption.startH = this.state.height;
        this.eventOption.startLeft = this.state.left;
        this.eventOption.startTop = this.state.top;
    }
    _onMouseMove(e) {
        e.stopPropagation();
        e.preventDefault();
        let {isDown, type} = this.eventOption;
        if(this.isFirst)
            type = 'move';
        else 
            if(!isDown) return ;
        switch(type) {
            case 'rotate':
            this._rotateMouseMove(e);
            return ;
            case 'move':
            this._moveMouseMove(e);
            return;
            default:
            this._sizeMouseMove(e);
        }
    }
    // 移动
    _moveMouseMove(e) {
        let {startX, startY, startLeft, startTop} = this.eventOption;
        let moveFn = this.props.move;
        if(!moveFn) return ;
        let {x, y} = moveFn(e);
        let left = x - startX + startLeft;
        let top = y - startY + startTop;
        this.offset.left = x - startX;
        this.offset.top = y - startY;
        this.setState({top, left}, this._change);
    }
    // 拉伸
    _sizeMouseMove(e) {
        let {startX, startY, startH, startW, startLeft, startTop, type} = this.eventOption;
        let moveFn = this.props.move;
        if(!moveFn) return ;
        let {x, y} = moveFn(e);
        let {width, height, left, top} = this.state;
        switch(type) {
            case 'rt':
                width = x + startW - startX;
                height = startH + startY - y;
                top = y - startY + startTop;
                break;
            case 'rb':
                width = x + startW - startX;
                height = y + startH - startY;
                break;
            case 'lt':
                width = startW + startX - x;
                left = x - startX + startLeft;  
                height = startH + startY - y;
                top = y - startY + startTop;
                break;
            case 'lb':
                width = startW + startX - x;
                left = x - startX + startLeft;
                height = y + startH - startY;
                break;
        }
        if(width <= 0 || height <= 0) return ;
        this.setState({ width, height, left, top }, this._change);
    }

    // 旋转
    _rotateMouseMove(e) {
        let {pageX, pageY} = e;
        let {width, height} = this.state;
        let {x, y} = this.eventOption;
        let origin = {x: x + width / 2, y: y + height / 2 };
        let x1 = pageX - origin.x;
        let y1 = origin.y - pageY;
        this._atan2(y1, x1);
    }
    _atan2(y, x) {
        let degree = Math.atan2(y, x) / (Math.PI / 180);
        degree = -(degree - 90); 
        this.setState({rotate: degree})
    }
    _change() {
        if(this.props.change) {
            let offsetLeft = this.offset.left;
            let offsetTop = this.offset.top;
            // console.log(this.offset)
            this.props.change(
                Object.assign(
                    {}, 
                    this.state,
                    {id: this.props.id, select: this.props.select, offsetTop, offsetLeft}
                )
            )
        }
    }
    _onMouseUp() {
        this.isFirst = false;
        if(this.eventOption.isDown) {
            if(this.props.end)
                this.props.end();
            this.eventOption.isDown = false;
        }
    }
    componentDidUpdate(prevProps) {
        let {left, top} = this.props;
        if(left && top && (prevProps.left !== left || prevProps.top !== top)) {
            console.log('prevLeft：', prevProps.left)
            console.log('left：', left)
            this.setState({left, top}, this._change)
        }
    }
    componentDidMount() {
        this._event();
    }
    componentWillUnmount() {
        this._cleanEvent();
    }
    render() {
        let { width, height, rotate, left, top } = this.state;
        let { active, comp, click } = this.props;
        let Comp = comp;
        return (
            <div className={[style.transformBox, active ? style.active : ''].join(' ')} 
                style={{width, height, transform: `translate(${left}px,${top}px) rotate(${rotate}deg)`}}
                onClick={click}>
                <div className={style.transformBody}>
                    {/* 操作按钮 */}
                    <div className={style.transformTools} onMouseDown={this._onMouseDown} data-type="move">
                        <span onMouseDown={this._onMouseDown} data-type="rotate" className={[style.transformTool, style.rotate].join(' ')}></span>
                        <span onMouseDown={this._onMouseDown} data-type="lt" className={[style.transformTool, style.lt].join(' ')}></span>
                        <span onMouseDown={this._onMouseDown} data-type="rt" className={[style.transformTool, style.rt].join(' ')}></span>
                        <span onMouseDown={this._onMouseDown} data-type="lb" className={[style.transformTool, style.lb].join(' ')}></span>
                        <span onMouseDown={this._onMouseDown} data-type="rb" className={[style.transformTool, style.rb].join(' ')}></span>
                    </div>
                    { comp && <Comp width={width} height={height} />}
                    {this.props.children}
                </div>
            </div>
        );
    }
    _event() {
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('mouseup', this._onMouseUp);
    }
    _cleanEvent() {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
    }
}