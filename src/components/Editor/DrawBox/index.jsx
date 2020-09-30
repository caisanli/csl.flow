// 画框
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import style from './index.module.less';
export default function DrawBox(props) {
    
    function mousemove() {
        if(!props.isDown)
            return ;
    }
    function mouseup() {

    }
    useEffect(() => {
        var body = document/body;
        body.addEventListener('mousemove', mousemove)
        body.addEventListener('mouseup', mouseup)
        return function() {
            body.removeEventListener('mousemove', mousemove)
            body.removeEventListener('mouseup', mouseup)
        }
    })
    return (
        <div className={style.drawBox} 
            style={{width: drawWidth, height: drawHeight, left: drawLeft, top: drawTop, zIndex: '9999999'}} />
    );
}

DrawBox.propTypes = {
    isDown: PropTypes.bool.isRequired
}