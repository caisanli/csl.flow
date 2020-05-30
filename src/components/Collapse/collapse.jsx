import React from 'react';
import PropsType from 'prop-types';

function Collapse(props) {
    console.log(props)
    return (
        <div>
            { props.children }
        </div>
    )
}
Collapse.propTypes = {
    accordion: PropsType.bool, // 是否开启手风琴
    defaultActiveKeys: PropsType.array, // 默认展开
    children: PropsType.elementType.isRequired
}
