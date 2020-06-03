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
    Comp: Text
},{
    title: '备注',
    Comp: Remark
},{
    title: '圆形',
    Comp: Circle
},{
    title: '矩形',
    Comp: Rect
},{
    title: '圆角矩形',
    Comp: RectRadius
},{
    title: '三角形',
    Comp: Triangle
},{
    title: '菱形',
    Comp: Diamond
},{
    title: '五边形',
    Comp: Pentagonal
},{
    title: '六边形',
    Comp: Hexagon
},{
    title: '八边形',
    Comp: Octagon
},{
    title: '五角星',
    Comp: Start
},{
    title: '锥形',
    Comp: Cone
},{
    title: '扇形',
    Comp: Sector
},{
    title: '十字形',
    Comp: Cross
},{
    title: '云',
    Comp: Cloud
},{
    title: '气泡',
    Comp: Talk
},{
    title: '左括号',
    Comp: BracketLeft
},{
    title: '右括号',
    Comp: BracketRight
},{
    title: 'APQC',
    Comp: Apqc
}, {
    title: '下箭头',
    Comp: ArrowBottom
}, {
    title: '上箭头',
    Comp: ArrowTop
}, {
    title: '左箭头',
    Comp: ArrowLeft
}, {
    title: '右箭头',
    Comp: ArrowRight
}, {
    title: '左返回箭头',
    Comp: BackArrowLeft
}]
