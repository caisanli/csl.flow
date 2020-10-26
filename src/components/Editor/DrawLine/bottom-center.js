import { GRAPH_WIDTH, START_XY, END_X, LINE_HEIGHT, GRAPH_OFFSET_HEIGHT } from './constant';

export default function(width, height, isWidthNegative) {
    // 两根线之间的宽度
    let offsetWidth = width - LINE_HEIGHT * 2 - START_XY * 2 - GRAPH_OFFSET_HEIGHT * 2;
     // 起点时的指针图形（暂时三角）
     let startGraphPoint = ``;
     // 结束点时指针图形（暂时三角）
     let endGraphPoint = ``;
     // 右方的连线
     let rightLine = `V ${height - GRAPH_WIDTH - END_X}`;
     // 结束时的连线
     let endLine = `V ${ START_XY }`;
     // 开始点
     let startPoint = ``;
     // 图形结束时连接线的点
     let graphToLinePoint = ``;
 
     // 为负数时 向上折叠
     if(isWidthNegative) {
         if(offsetWidth > 0) {
             let upX = width / 2 - LINE_HEIGHT / 2;
             upLine = `H ${ upX } L ${ upX } ${ START_XY + GRAPH_OFFSET_HEIGHT } H ${width - GRAPH_WIDTH - END_X}`;
             let downX = width / 2 + LINE_HEIGHT / 2;
             endLine = `L ${ downX } ${ LINE_HEIGHT + START_XY + GRAPH_OFFSET_HEIGHT } L ${ downX } ${ height - (START_XY + GRAPH_OFFSET_HEIGHT) } H ${ START_XY }`;
         }
         startPoint = `M ${ START_XY } ${ height -  (START_XY + GRAPH_OFFSET_HEIGHT + LINE_HEIGHT) }`;
         endGraphPoint = `M ${width - GRAPH_WIDTH - END_X} ${ START_XY + GRAPH_OFFSET_HEIGHT } L ${width - GRAPH_WIDTH - END_X} ${ START_XY } L ${ width - END_X } ${ START_XY + GRAPH_HEIGHT / 2 } L ${ width - GRAPH_WIDTH - END_X } ${ START_XY + GRAPH_HEIGHT }`;
         graphToLinePoint = `L ${ width - GRAPH_WIDTH - END_X } ${ START_XY + GRAPH_OFFSET_HEIGHT + LINE_HEIGHT }`;
     } else { // 为正数时 向下折叠
         if(offsetHeight > 0) {
             let upX = width / 2 + LINE_HEIGHT / 2;
             upLine = `H ${ upX }  L ${ upX } ${ height - (START_XY + LINE_HEIGHT + GRAPH_OFFSET_HEIGHT) } H ${width - GRAPH_WIDTH - END_X}`;
             let downX = width / 2 - LINE_HEIGHT / 2;
             endLine = `L ${ downX } ${ height - (START_XY + GRAPH_OFFSET_HEIGHT) } L ${ downX } ${ START_XY + LINE_HEIGHT + GRAPH_OFFSET_HEIGHT } H ${ START_XY }`;
         }
         startPoint = `M ${ START_XY } ${ START_XY + GRAPH_OFFSET_HEIGHT }`;
         endGraphPoint = `M ${width - GRAPH_WIDTH - END_X} ${ height - (START_XY + LINE_HEIGHT + GRAPH_OFFSET_HEIGHT) }  L ${width - GRAPH_WIDTH - END_X} ${ height - ( START_XY + GRAPH_HEIGHT ) } L ${ width - END_X } ${ height - ( START_XY + GRAPH_HEIGHT / 2 ) } L ${ width - GRAPH_WIDTH - END_X } ${ height - START_XY }`;
         graphToLinePoint = `L ${ width - GRAPH_WIDTH - END_X } ${ height - (START_XY + GRAPH_OFFSET_HEIGHT) }`;
     }
     return {path: `${ startPoint } ${ upLine } ${ graphToLinePoint } ${ endLine }`, endPoint: endGraphPoint};
}