import React, { useState, useEffect } from 'react';
import Button from './button/index'
import DropDown from '@/components/DropDown';
import { SketchPicker } from 'react-color';
import style from './index.module.less';

// 背景颜色
export default function BackgroundColor(props) {
    const [color, setColor] = useState('#fff');
    function onChange(val) {
        let color = val.hex;
        setColor(color);
        props.onChange && props.onChange({value: color});
    }
    
    let dropdown = null;
    function onRef(instance) {
        dropdown = instance;
    }
    return <DropDown onRef={onRef}
                    disabled={props.disabled}
                    text={
                            <Button icon='icon-tianchong'>
                                <div style={{backgroundColor: color}} className={style.fontColorBar}></div>
                            </Button>
                        }
                    content={<SketchPicker color={color} onChange={onChange} />}/>;

}