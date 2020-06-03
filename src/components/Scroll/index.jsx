import React from 'react'
import PropTypes from 'prop-types'
// 样式
import style from './index.module.less'
class Scroll extends React.Component {
  constructor(props) {
    super(props)
    // state
    this.state = {
      yt: 0, // y轴移动距离
      yh: 0, // y轴高度
      xl: 0, // x轴移动距离
      xw: 0, // x轴宽度
      mr: 0
    }
    // 绑定函数
    this._events = this._events.bind(this)
    this._onScroll = this._onScroll.bind(this)
    this._getBarWidth = this._getBarWidth.bind(this)
    this._onMouseup = this._onMouseup.bind(this)
    this._setThumbWidthHeight = this._setThumbWidthHeight.bind(this)
    this._onXMouseDown = this._onXMouseDown.bind(this)
    this._onXMouseMove = this._onXMouseMove.bind(this)
    this._onYMouseDown = this._onYMouseDown.bind(this)
    this._onYMouseMove = this._onYMouseMove.bind(this)
    // 绑定变量
    this.$content = React.createRef()
    // 事件处理时的参数
    this.eventOption = {
      verticalOffset: 0,
      isVerticalDown: false,
      horizontalOffset: 0,
      isHorizontalDown: false,
      startY: 0,
      startX: 0,
      ty: 0,
      tx: 0,
      boxWidth: 0,
      boxHeight: 0
    }
  }
  componentDidMount() {
    // 挂载完成
    this.scrollBarWidth = this._getBarWidth()
    this._events()
    this._setThumbWidthHeight()
  }
  componentWillUnmount() {
    // 销毁之前
    let { x, y } = this.props
    x && document.removeEventListener('mousemove', this._onXMouseMove)
    y && document.removeEventListener('mousemove', this._onYMouseMove)
    document.removeEventListener('mouseup', this._onMouseup)
    window.removeEventListener('resize', this._onResize)
  }
  appendChild(elem) {
    // 添加
    this.$content.appendChild(elem)
  }
  innerHTML(html) {
    // 设置
    this.$content.innerHTML = html
  }
  removeChild() {
    // 删除
    let elem = this.$content.firstChild
    if (elem) this.$content.removeChild(elem)
  }
  _events() {
    // 事件列表
    const self = this
    this.eventOption.boxHeight = this.$content.current.offsetHeight
    this.eventOption.boxWidth =
      this.$content.current.offsetWidth + this.scrollBarWidth
    // 初始化配置
    const config = {
      childList: true,
    }
    // IE10 => 'MutationEvent'
    const observer = new (MutationObserver || MutationEvent)(() => {
      self._setThumbWidthHeight()
    })
    observer.observe(this.$content.current, config)
    window.addEventListener('resize', this._onResize.bind(this))
    // y轴滚动
    this.props.y &&
      document.addEventListener('mousemove', this._onYMouseMove.bind(this))
    // x轴滚动
    this.props.x &&
      document.addEventListener('mousemove', this._onXMouseMove.bind(this))
    // mouseup 事件  
    document.addEventListener('mouseup', this._onMouseup.bind(this))
  }
  _onResize() {// 监听窗口变化
    this.eventOption.boxHeight = this.$content.current.offsetHeight
    this._setThumbWidthHeight();
    this._onScroll()
  }
  _onScroll() { // 监听滚动事件
    let scale = this.$content.current.scrollTop / this.$content.current.scrollHeight
    let top = scale * this.eventOption.boxHeight
    this.eventOption.ty = top
    this.setState({
      yt: top,
    })
  }
  _onMouseup(e) {
    e.preventDefault()
    if (this.eventOption.isVerticalDown) this.eventOption.isVerticalDown = false
    if (this.eventOption.isHorizontalDown)
      this.eventOption.isHorizontalDown = false
  }
  _onYMouseDown(e) {
    e.preventDefault()
    this.eventOption.verticalOffset = this.eventOption.ty
    this.eventOption.isVerticalDown = true
    this.eventOption.startY = e.pageY
    this.eventOption.boxHeight = this.$content.current.offsetHeight
  }
  _onYMouseMove(e) {
    e.preventDefault()
    if (!this.eventOption.isVerticalDown) return
    let endY = e.pageY
    let top = endY - this.eventOption.startY + this.eventOption.verticalOffset
    top = (top * this.$content.current.scrollHeight) / this.eventOption.boxHeight
    self.$content.scrollTop = top
  }
  _onXMouseDown(e) {
    e.preventDefault()
    this.eventOption.verticalOffset = this.eventOption.tx
    this.eventOption.isHorizontalDown = true
    this.eventOption.startX = e.pageX
  }
  _onXMouseMove(e) {
    e.preventDefault()
    if (!this.eventOption.isHorizontalDown) return
    let endX = e.pageX
    let left =
      endX - this.eventOption.startX + this.eventOption.horizontalOffset
    let scrollWidth = this.$content.current.scrollWidth
    left = (left * this.$content.current.scrollWidth) / this.eventOption.boxWidth
    this.$content.scrollLeft = left
    let scale = left / scrollWidth
    let x = scale * this.eventOption.boxWidth
    x =
      x < 0
        ? 0
        : this.eventOption.boxWidth > this.$horizontalThumb.offsetWidth + x
        ? x
        : this.eventOption.boxWidth - this.$horizontalThumb.offsetWidth
    this.eventOption.tx = x
    this.setState({
      xl: x,
    })
  }
  _getOffsetTop(elem) {
    // 获取offset
    let top = elem.offsetTop
    let parent = elem.offsetParent
    while (parent) {
      top += parent.offsetTop
      parent = parent.offsetParent
    }
    return top
  }
  _setThumbWidthHeight() {
    // 设置滚动条的高度和宽度
    let heightScale =
      (this.$content.current.clientHeight * 100) / this.$content.current.scrollHeight;
    let right = -this.scrollBarWidth
    if (heightScale >= 100) {
      heightScale = 0
      right = 0
    }
    this.setState({mr: right})
    if (this.props.y) this.setState({ yh: heightScale })
    if (this.props.x) {
      let widthScale =
        (this.$content.clientWidth * 100) / this.$content.scrollWidth
      if (widthScale >= 100) widthScale = 0
      this.setState({ xw: widthScale })
    }
  }
  _getBarWidth() {
    // 获取不同浏览器下滚动条的宽度
    let box = document.createElement('div')
    let body = document.body
    box.style.overflow = 'scroll'
    box.style.position = 'absolute'
    box.style.top = '9999px'
    box.style.height = '20px'
    // box.style.width = '20px'
    body.appendChild(box)
    let children = document.createElement('div');
    children.style.height = '30px';
    box.appendChild(children)
    let width = box.offsetWidth    
    body.removeChild(box)
    return width
  }
  render() {
    // 生成dom
    let { yt, yh, xl, xw, mr } = this.state;
    let { x, y, visible } = this.props;
    return (
      <div className={[style.scrollBox, !visible ? style.hoverThumb : ''].join(' ')}>
        {/* 竖向滚动条 */}
        {
            x && <div className={style.scrollVerticalBarBox}>
                    <div className={style.scrollVerticalBar}>
                        <div
                        style={{
                            transform: 'translateY(' + yt + 'px)',
                            height: yh + '%',
                        }}
                        className={style.scrollVerticalThumb}
                        ></div>
                    </div>
                </div>
        }
        {/* 横向滚动条 */}
        {
            y && <div className={style.scrollHorizontalBarBox}>
                    <div className={style.scrollHorizontalBar}>
                    <div
                        style={{ 
                            transform: 'translateX(' + xl + 'px)', 
                            width: xw + '%' 
                        }}
                        className={style.scrollHorizontalThumb}
                    ></div>
                    </div>
                </div>
        }
        
        {/* 内容 */}
        <div style={{ height: '100%' }}>
          <div 
                className={style.scrollContent} 
                style={{marginRight: mr + 'px', overflowX: x ? 'auto' : 'hidden', overflowY: y ? 'auto': 'hidden'}} 
                onScroll={this._onScroll} ref={this.$content}>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
Scroll.propTypes = {
  x: PropTypes.bool,
  y: PropTypes.bool,
  visible: PropTypes.bool,
}
Scroll.defaultProps = {
  x: true,
  y: true,
  visible: true,
}
export default Scroll
