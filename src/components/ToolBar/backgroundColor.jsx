import React, { useState, useEffect } from 'react';
import Button from './button/index'
import DropDown from '@/components/DropDown';
import { SketchPicker } from 'react-color';
import style from './index.module.less';

// 背景颜色
export default function BackgroundColor(props) {
    const [color, setColor] = useState(props.value);
    function onChange(val) {
        let color = val.hex;
        setColor(color);
        props.onClick && props.onClick(color);
    }
    
    let dropdown = null;
    function onRef(instance) {
        dropdown = instance;
    }
    useEffect(() => {
        setColor(props.value)
    }, [props.value])
    return <DropDown onRef={onRef}
                    disabled={props.disabled}
                    text={
                            <Button icon='icon-tianchong' disabled={props.disabled}>
                                <div style={{backgroundColor: color}} className={style.fontColorBar}></div>
                            </Button>
                        }
                    content={<SketchPicker color={color} onChange={onChange} />}/>;

}