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
    comp: Text
},{
    title: '备注',
    comp: Remark
},{
    title: '圆形',
    comp: Circle
},{
    title: '矩形',
    comp: Rect
},{
    title: '圆角矩形',
    comp: RectRadius
},{
    title: '三角形',
    comp: Triangle
},{
    title: '菱形',
    comp: Diamond
},{
    title: '五边形',
    comp: Pentagonal
},{
    title: '六边形',
    comp: Hexagon
},{
    title: '八边形',
    comp: Octagon
},{
    title: '五角星',
    comp: Start
},{
    title: '锥形',
    comp: Cone
},{
    title: '扇形',
    comp: Sector
},{
    title: '十字形',
    comp: Cross
},{
    title: '云',
    comp: Cloud
},{
    title: '气泡',
    comp: Talk
},{
    title: '左括号',
    comp: BracketLeft
},{
    title: '右括号',
    comp: BracketRight
},{
    title: 'APQC',
    comp: Apqc
}, {
    title: '下箭头',
    comp: ArrowBottom
}, {
    title: '上箭头',
    comp: ArrowTop
}, {
    title: '左箭头',
    comp: ArrowLeft
}, {
    title: '右箭头',
    comp: ArrowRight
}, {
    title: '左返回箭头',
    comp: BackArrowLeft
}]
