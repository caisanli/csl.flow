// 网格
import React from 'react';

export default function(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={props.width} height={props.height}>
            <defs id="kb0ojgdseg">
                <pattern stroke="#f0f0f0" vectorEffect="non-scaling-stroke" strokeWidth="1" id="kb0ojgdseh" patternUnits="userSpaceOnUse" x="0" y="0" width="56" height="56">
                    <rect x="0" y="0" width="100%" height="100%"></rect>
                    <line x1="0" y1="14.5" x2="56" y2="14.5"></line>
                    <line x1="14.5" y1="0" x2="14.5" y2="56"></line>
                    <line x1="0" y1="28.5" x2="56" y2="28.5"></line>
                    <line x1="28.5" y1="0" x2="28.5" y2="56"></line>
                    <line x1="0" y1="42.5" x2="56" y2="42.5"></line>
                    <line x1="42.5" y1="0" x2="42.5" y2="56"></line>
                    <line x1="0" y1="0.5" x2="56" y2="0.5" stroke="silver" strokeOpacity="0.5"></line>
                    <line x1="0.5" y1="0" x2="0.5" y2="56" stroke="silver" strokeOpacity="0.5"></line>
                </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#kb0ojgdseh)"></rect>
        </svg>
    )
}