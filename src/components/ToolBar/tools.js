import Revoke from './revoke';
import Recovery from './recovery';
import Format from './format';
import FontFamily from './fontFamily';
import FontSize from './fontSize';
import Bold from './bold';
import Italics from './italics';
import Underline from './underline';
import FontColor from './fontColor';
import Align from './align';
import BackgroundColor from './backgroundColor';
import BorderSize from './borderSize';
import BorderStyle from './borderStyle';
import Top from './top';
import Bottom from './bottom';
import Lock from './lock';
export default [
    {
        "name": "撤销",
        "comp": Revoke,
        "value": "revoke",
        "disabled": false
    }, {
        "name": "恢复",
        "comp": Recovery,
        "value": "recovery",
        "disabled": false
    }, {
        "name": "格式刷",
        "value": "format",
        "comp": Format,
        "interval": true,
        "disabled": false
    }, {
        "name": "字体",
        "comp": FontFamily,
        "value": "fontFamily",
        "interval": true,
        "disabled": false
    }, {
        "name": "字号",
        "value": "fontSize",
        "comp": FontSize,
        "interval": true,
        "disabled": false
    }, {
        "name": "加粗",
        "comp": Bold,
        "value": "bold",
        "disabled": false
    }, {
        "name": "斜体",
        "comp": Italics,
        "value": "italics",
        "disabled": false
    }, {
        "name": "下划线",
        "comp": Underline,
        "value": "underline",
        "disabled": false
    }, {
        "name": "字体颜色",
        "comp": FontColor,
        "value": "fontColor",
        "disabled": false
    }, {
        "name": "对齐方式",
        "value": "align",
        "comp": Align,
        "interval": true,
        "disabled": false
    }, {
        "name": "填充",
        "value": "backgroundColor",
        "name": "线条颜色",
        "comp": BackgroundColor,
        "disabled": false
    }, {
        "name": "线宽",
        "value": "borderSize",
        "comp": BorderSize,
        "disabled": false
    }, {
        "name": "线条样式",
        "value": "borderStyle",
        "interval": true,
        "comp": BorderStyle,
        "disabled": false
    }, {
        "name": "连线类型",
        "value": "connectType",
        "disabled": false
    }, {
        "name": "起点",
        "value": "connectStart",
        "disabled": false
    }, {
        "name": "终点",
        "value": "connectEnd",
        "interval": true,
        "disabled": false
    }, {
        "name": "置顶",
        "value": "top",
        "comp": Top,
        "disabled": false
    }, {
        "name": "置底",
        "value": "bottom",
        "comp": Bottom,
        "interval": true,
        "disabled": false
    }, {
        "name": "锁定",
        "value": "lock",
        "comp": Lock,
        "interval": true,
        "disabled": false
    }, {
        "name": "插入链接",
        "value": "link",
        "disabled": false
    }
]