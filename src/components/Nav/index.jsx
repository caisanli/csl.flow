import React from 'react';
// css module
import style from "./index.module.less";
console.log(style);
export default function() {
    return (
        <div className={ style.box }></div>
    )
}