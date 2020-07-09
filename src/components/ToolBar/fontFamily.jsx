import React, { useEffect } from 'react';
import Button from './button/index';
import DropDown from '@/components/DropDown';
// 样式
import style from './index.module.less';
// 字体列表
const fontFamily = [{name: 'serif', value: 'serif'}, 
                    {name: 'sans-serif', value: 'sans-serif'}, 
                    {name: 'cursive', value: 'cursive'},
                    {name: 'fantasy', value: 'fantasy'},
                    {name: 'monospace', value: 'monospace'}];
// 字体
export default function FontFamily(props) {
    let dropdown = null;
    console.log(props)
    function onClickItem(f) {
        dropdown.close();
        props.onClick && props.onClick('revoke', f);
    }
    function onRef(instance) {
        dropdown = instance;
    }
    return <DropDown onRef={onRef}
                    disabled={props.disabled}
                    icon="icon-zu" 
                    text={<Button {...props}>{ '宋体' }</Button>}
                    content={<div>
                        {fontFamily.map((f, i) => <div className={style.dropdownButtonItem} onClick={() => onClickItem(f)} key={i}>{f.name}</div>)}
                    </div>}/>
}
