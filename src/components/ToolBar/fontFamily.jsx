import React, {useState} from 'react';
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
    let [value, setValue] = useState(props.value)
    function onClickItem(f) {
        dropdown.close();
        setValue(f.value);
        props.onClick && props.onClick({value: f.value});
    }
    function onRef(instance) {
        dropdown = instance;
    }
    return <DropDown onRef={onRef}
                    disabled={props.disabled}
                    icon="icon-zu" 
                    text={<Button disabled={props.disabled}>{ value }</Button>}
                    content={<div>
                        {fontFamily.map((f, i) => <div className={style.dropdownButtonItem} onClick={() => onClickItem(f)} key={i}>{f.name}</div>)}
                    </div>}/>
}
