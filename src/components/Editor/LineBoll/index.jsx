import React, {useEffect} from 'react';
import style from './index.module.less';
export default function LineBoll() {
    let eventOption = {
        isDown: false
    }

    function _onMouseDown(e) {
        e.stopPropagation();
        Object.assign(eventOption, {
            isDown: true,
            startX: e.pageX,
            startY: e.pageY
        })
    }
    function _onMouseMove(e) {
        let { isDown, startX, startY } = eventOption;
        if(!isDown) return ;
        let endX = e.pageX;
        let endY = e.pageY;
        props.onMove && props.onMove(endX - startX, endY - startY);
    }
    function _onMouseUp() {
        eventOption.isDown = false;
    }

    useEffect(() => {
        document.addEventListener('mousemove', _onMouseMove)
        document.addEventListener('mouseup', _onMouseUp)
        return function() {
            document.removeEventListener('mousemove', _onMouseMove)
            document.removeEventListener('mouseup', _onMouseUp)
        }
    })
    return (
        <span onMouseDown={_onMouseDown} className={style.lineBoll}></span>
    )
}