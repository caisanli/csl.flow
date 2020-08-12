
// 图形组件
import Card from './Card';
import ChildFlowChart from './ChildFlowChart';
import ConnectOffPage from './ConnectOffPage';
import CycleLimit from './CycleLimit';
import Data from './Data';
import DataBase from './DataBase';
import DataStorage from './DataStorage';
import DataStored from './DataStored';
import Display from './Display';
import Document from './Document';
import Handle from './Handle';
import Input from './Input';
import InternalStorage from './InternalStorage';
import PunchedTape from './PunchedTape';
import Terminal from './Terminal';
import Rect from '../base/Rect';
import Diamond from '../base/Diamond';
import Hexagon from '../base/Hexagon';
import Circle from '../base/Circle';
export default [{
    title: '流程',
    comp: Rect,
    name: 'rect'
}, {
    title: '判定',
    name: 'diamond',
    comp: Diamond
}, {
    title: '开始/结束',
    name: 'terminal',
    comp: Terminal
}, {
    title: '文档',
    name: 'document',
    comp: Document
}, {
    title: '数据',
    name: 'data',
    comp: Data
}, {
    title: '子流程',
    name: 'childFlowChart',
    comp: ChildFlowChart
}, {
    title: '外部数据',
    name: 'dataStored',
    comp: DataStored
}, {
    title: '内部储存',
    name: 'internalStorage',
    comp: InternalStorage
}, {
    title: '队列数据',
    name: 'dataStorage',
    comp: DataStorage
}, {
    title: '数据库',
    name: 'dataBase',
    comp: DataBase
}, {
    title: '人工输入',
    name: 'input',
    comp: Input
}, {
    title: '卡片',
    name: 'card',
    comp: Card
}, {
    title: '条带',
    name: 'punchedTape',
    comp: PunchedTape
}, {
    title: '展示',
    name: 'display',
    comp: Display
}, {
    title: '人工操作',
    name: 'handle',
    comp: Handle
}, {
    title: '预备',
    comp: Hexagon,
    name: 'hexagon'
}, {
    title: '循环限值',
    name: 'cycleLimit',
    comp: CycleLimit
}, {
    title: '页内引用',
    name: 'circle',
    comp: Circle
}, {
    title: '跨页引用',
    name: 'connectOffPage',
    comp: ConnectOffPage
}]