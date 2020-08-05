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
export default [{
    title: '卡片',
    name: 'card',
    comp: Card
}, {
    title: '子流程',
    name: 'childFlowChart',
    comp: ChildFlowChart
}, {
    title: '跨页引用',
    name: 'connectOffPage',
    comp: ConnectOffPage
}, {
    title: '循环限值',
    name: 'cycleLimit',
    comp: CycleLimit
}, {
    title: '数据',
    name: 'data',
    comp: Data
}, {
    title: '数据库',
    name: 'dataBase',
    comp: DataBase
}, {
    title: '队列数据',
    name: 'dataStorage',
    comp: DataStorage
}, {
    title: '外部数据',
    name: 'dataStored',
    comp: DataStored
}, {
    title: '展示',
    name: 'display',
    comp: Display
}, {
    title: '文档',
    name: 'document',
    comp: Document
}, {
    title: '人工操作',
    name: 'handle',
    comp: Handle
}, {
    title: '输入',
    name: 'input',
    comp: Input
}, {
    title: '内部储存',
    name: 'internalStorage',
    comp: InternalStorage
}, {
    title: '条带',
    name: 'punchedTape',
    comp: PunchedTape
}, {
    title: '终端',
    name: 'terminal',
    comp: Terminal
}]