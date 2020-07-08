import React, {useState} from 'react';
import Button from './button';
import DropDown from '@/components/DropDown';
// 字体列表
const fontFamily = [{name: 'serif', value: 'serif'}, 
                    {name: 'sans-serif', value: 'sans-serif'}, 
                    {name: 'cursive', value: 'cursive'},
                    {name: 'fantasy', value: 'fantasy'},
                    {name: 'monospace', value: 'monospace'}];
// 点击字体
// 字体
export default function FontFamily(props) {
    const [visible, setVisible] = useState(false);
    function onClickItem(f) {
        setVisible(false);
        props.click && props.click('revoke', f);
    }
    function onChange(val) {
        setVisible(val);
    }
    return <DropDown visible={visible}
                    change={onChange}
                    icon="icon-zu" 
                    text={<Button {...props}>{ '宋体' }</Button>}
                    content={<div>
                        {fontFamily.map((f, i) => <div onClick={e => onClickItem(f)} key={i}>{f.name}</div>)}
                    </div>}/>
}
