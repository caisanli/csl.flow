// 内部储存
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <path xmlns="http://www.w3.org/2000/svg" d="M228.5 841h-180V288h180v553z m-155-25h130V313h-130v503z" />
            <path xmlns="http://www.w3.org/2000/svg" d="M959.9 841H203.5V288h756.4v553z m-731.4-25h706.4V313H228.5v503z" />
            <path xmlns="http://www.w3.org/2000/svg" d="M228.5 313h-180V166.5h180V313z m-155-25h130v-96.5h-130V288z" />
            <path xmlns="http://www.w3.org/2000/svg" d="M959.9 313H203.5V166.5h756.4V313z m-731.4-25h706.4v-96.5H228.5V288z"/>
        </Svg>
    );
}