import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './index.module.less';
import { guid } from '@assets/js/utils';
export default class ButtonTip extends Component {
    constructor() {
        super()
        this.id = guid();
        this.$ref = React.createRef();
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.state = {
            top: 0,
            visible: false
        }
    }
    onMouseEnter() {
        this.setState({visible: true})
    }
    onMouseLeave() {
        this.setState({visible: false})
    }
    componentDidMount() {
        let top = 10;
        top += this.$ref.current.offsetHeight;
        this.setState({ top: -top })
    }
    render() {
        let {top, visible} = this.state;
        let display = visible ? 'block' : 'none';
        return (
            <div ref={this.$ref}
                    className={style.buttonTip} 
                    onMouseEnter={this.onMouseEnter} 
                    onMouseLeave={this.onMouseLeave}>
                {this.props.children}
                <div className={style.buttonTipWarp} style={{top: top + 'px', display }}>
                    <div className={style.buttonTipText}>
                        {this.props.title}
                    </div>
                    <div className={style.buttonTipArrow}></div>
                </div>
            </div>
        )
    }
}
ButtonTip.propTypes = {
    title: PropTypes.string.isRequired,
}