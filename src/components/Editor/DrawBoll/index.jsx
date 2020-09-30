import React from 'react';
import PropTypes from 'prop-types';
import style from './index.module.less';

export default class LineBoll extends React.Component {
    constructor() {
        super();
        // 属性
        this.currentId = null;
        // 事件
        this._onMouseDown = this._onMouseDown.bind(this)
        this._onMouseMove = this._onMouseMove.bind(this)
        this._onMouseUp = this._onMouseUp.bind(this)
        this.eventOption = {
            isDown: false,
            startX: 0,
            startY: 0
        }
    }
    _onMouseDown(e, boll) {
        e.stopPropagation();
        let startX = e.pageX, startY = e.pageY;
        let id = Date.now();
        this.currentId = id;
        this.props.onDown && this.props.onDown({id, startX, startY, parent: this.props.parent}, boll);
        Object.assign(this.eventOption, {
            isDown: true,
            startX,
            startY
        })
    }
    _onMouseMove(e) {
        let { isDown, startX, startY } = this.eventOption;
        
        if(!isDown) return ;
        let endX = e.pageX;
        let endY = e.pageY;
        let width = endX - startX;
        let height = endY - startY;
        this.props.onMove && this.props.onMove({id: this.currentId, width , height });
    }
    _onMouseUp() {
        this.eventOption.isDown = false;
        this.props.onUp && this.props.onUp({id: this.currentId});
    }
    componentDidMount() {
        document.addEventListener('mousemove', this._onMouseMove)
        document.addEventListener('mouseup', this._onMouseUp)
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove', this._onMouseMove)
        document.removeEventListener('mouseup', this._onMouseUp)
    }
    
    render() {
        let { enter } = this.props;
        return (
            <>
                {
                    this.props.dots.map((d, i) => 
                        <span onMouseDown={e => this._onMouseDown(e, d)}
                            key={i} 
                            style={{
                                width: d.width + 'px',
                                height: d.height + 'px',
                                left: d.left,
                                top: d.top,
                                right: d.right,
                                bottom: d.bottom
                            }}
                            data-type={d.dir}
                            className={[style.lineBoll, enter ? style.active : ''].join(' ')} />)
                }
            </>)
    }
}
LineBoll.propTypes = {
    dots: PropTypes.arrayOf(PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        dir: PropTypes.string.isRequired,
    })),
    visible: PropTypes.bool
}