import Apqc from "./Apqc";
import ArrowBottom from './ArrowBottom';
import ArrowLeft from './ArrowLeft';
import ArrowTop from './ArrowTop';
import ArrowRight from './ArrowRight';
import BackArrowLeft from './BackArrowLeft';
import BracketLeft from './BracketLeft';
import BracketRight from './BracketRight';
import Circle from './Circle';
import Cloud from './Cloud';
import Cone from './Cone';
import Cross from './Cross';
import Diamond from './Diamond';
import Hexagon from './Hexagon';
import Octagon from './Octagon';
import Pentagonal from './Pentagonal';
import Rect from './Rect';
import RectRadius from './RectRadius';
import Remark from './Remark';
import Sector from './Sector';
import Start from './Start';
import Talk from './Talk';
import Text from './Text';
import Triangle from './Triangle';

export default [{
    title: '文本',
    name: 'text',
    comp: Text
},{
    title: '备注',
    comp: Remark,
    name: 'remark'
},{
    title: '圆形',
    comp: Circle,
    name: 'circle'
},{
    title: '矩形',
    comp: Rect,
    name: 'rect'
},{
    title: '圆角矩形',
    comp: RectRadius,
    name: 'rectRadius'
},{
    title: '三角形',
    comp: Triangle,
    name: 'triangle'
},{
    title: '菱形',
    comp: Diamond,
    name: 'diamond'
},{
    title: '五边形',
    comp: Pentagonal,
    name: 'pentagonal'
},{
    title: '六边形',
    comp: Hexagon,
    name: 'hexagon'
},{
    title: '八边形',
    comp: Octagon,
    name: 'octagon'
},{
    title: '五角星',
    comp: Start,
    name: 'start'
},{
    title: '锥形',
    comp: Cone,
    name: 'cone'
},{
    title: '扇形',
    comp: Sector,
    name: 'sector'
},{
    title: '十字形',
    comp: Cross,
    name: 'cross'
},{
    title: '云',
    comp: Cloud,
    name: 'cloud'
},{
    title: '气泡',
    comp: Talk,
    name: 'talk'
},{
    title: '左括号',
    comp: BracketLeft,
    name: 'bracketLeft'
},{
    title: '右括号',
    comp: BracketRight,
    name: 'bracketRight'
},{
    title: 'APQC',
    comp: Apqc,
    name: 'apqc'
}, {
    title: '下箭头',
    comp: ArrowBottom,
    name: 'arrowBottom'
}, {
    title: '上箭头',
    comp: ArrowTop,
    name: 'arrowTop'
}, {
    title: '左箭头',
    comp: ArrowLeft,
    name: 'arrowLeft'
}, {
    title: '右箭头',
    comp: ArrowRight,
    name: 'arrowRight'
}, {
    title: '左返回箭头',
    comp: BackArrowLeft,
    name: 'backArrowLeft'
}]
