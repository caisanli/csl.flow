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
import BorderWidth from './borderWidth';
import BorderStyle from './borderStyle';
import Top from './top';
import Bottom from './bottom';
export default [
    {
        "name": "撤销",
        "comp": Revoke,
        "value": "revoke"
    }, {
        "name": "恢复",
        "comp": Recovery,
        "value": "recovery"
    }, {
        "name": "格式刷",
        "value": "format",
        "comp": Format,
        "interval": true
    }, {
        "name": "字体",
        "comp": FontFamily,
        "value": "fontFamily",
        "interval": true
    }, {
        "name": "字号",
        "value": "fontSize",
        "comp": FontSize,
        "interval": true
    }, {
        "name": "加粗",
        "comp": Bold,
        "value": "bold"
    }, {
        "name": "斜体",
        "comp": Italics,
        "value": "italics"
    }, {
        "name": "下划线",
        "comp": Underline,
        "value": "underline"
    }, {
        "name": "字体颜色",
        "comp": FontColor,
        "value": "fontColor"
    }, {
        "name": "对齐方式",
        "value": "align",
        "comp": Align,
        "interval": true
    }, {
        "name": "填充",
        "value": "backgroundColor",
        "name": "线条颜色",
        "comp": BackgroundColor,
        "value": "borderColor"
    }, {
        "name": "线宽",
        "value": "borderSize",
        "comp": BorderWidth
    }, {
        "name": "线条样式",
        "value": "borderStyle",
        "interval": true,
        "comp": BorderStyle
    }, {
        "name": "连线类型",
        "value": "connectType"
    }, {
        "name": "起点",
        "value": "connectStart"
    }, {
        "name": "终点",
        "value": "connectEnd",
        "interval": true
    }, {
        "name": "置顶",
        "value": "top",
        "comp": Top
    }, {
        "name": "置底",
        "value": "bottom",
        "comp": Bottom
    }, {
        "name": "锁定",
        "value": "lock"
    }, {
        "name": "解锁",
        "value": "unlock",
        "interval": true
    }, {
        "name": "插入链接",
        "value": "link"
    }
]