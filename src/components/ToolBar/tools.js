import Revoke from './revoke';
import Recovery from './recovery';
import Format from './format';
import FontFamily from './fontFamily';
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
        "interval": true
    }, {
        "name": "加粗",
        "value": "bold"
    }, {
        "name": "斜体",
        "value": "italics"
    }, {
        "name": "下划线",
        "value": "underline"
    }, {
        "name": "字体颜色",
        "value": "fontColor"
    }, {
        "name": "对齐方式",
        "value": "align",
        "interval": true
    }, {
        "name": "填充",
        "value": "backgroundColor"
    }, {
        "name": "线条颜色",
        "value": "borderColor"
    }, {
        "name": "线宽",
        "value": "borderSize"
    }, {
        "name": "线条样式",
        "value": "borderStyle",
        "interval": true
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
        "value": "top"
    }, {
        "name": "置底",
        "value": "bottom"
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