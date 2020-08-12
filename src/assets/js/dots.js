/** 字段: 
 * dir => 方向
 * pos => 定位
 */
export const dotWidth = 10;
export const dotHeight = 10;
// 默认一些配置
export default {
    tc: {
        dir: 'top-center',
        width: dotWidth,
        height: dotHeight,
        left: `calc(50% - ${ dotWidth / 2 }px)`,
        top: `-${ dotHeight / 2 }px`
    },
    mr: {
        dir: 'middle-right',
        width: dotWidth,
        height: dotHeight,
        right: `-${ dotWidth / 2 }px`,
        top: `calc(50% - ${ dotHeight / 2 }px)`
    },
    bc: {
        dir: 'bottom-center',
        width: dotWidth,
        height: dotHeight,
        left:  `calc(50% - ${ dotWidth / 2 }px)`,
        bottom: `-${ dotHeight / 2 }px`
    },
    ml: {
        dir: 'middle-left',
        width: dotWidth,
        height: dotHeight,
        left:  `-${ dotWidth / 2 }px`,
        top: `calc(50% - ${ dotHeight / 2 }px)`
    }
}