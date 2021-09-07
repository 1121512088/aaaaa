import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd-mobile';

import styles from './Header.less';

// 公用头部
// className            样式class
// left:                左边元素
// center:              中间元素
// right:               右边元素
// leftnone: bol类型    是否显示左边元素 true/显示写入 props.left false/默认
// style: {}            样式
// children:            子级元素

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  handleCallback = () => {
    this.props.left ? (this.props.left.props.onClick ? this.props.left.props.onClick() : this.props.history.goBack()) : this.props.history.goBack()
  }

  render() {
    const { className = '', left, center, right, leftnone = false, style = {}, children } = this.props;

    let isDom = (dom, key) => {
      let domh = null;
      if (typeof dom === 'object') {
        domh = String(dom['$$typeof']).indexOf('element') ? dom : <span>{dom}</span>;
      } else {
        if (key === 'center') {
          domh = <span className={styles.Header_center}>{dom}</span>;
        } else {
          domh = <span>{dom}</span>;
        }
      }
      return domh;
    };

    return (
      <div className={`${styles.Header_bg} ${className} header_touchmove`} style={style}>
        <div className={styles.header}>
          {leftnone ? left ? isDom(left) : <span style={{ width: '0.22rem', display: 'inline-block' }}></span> : <Icon type={'left'} onClick={this.handleCallback} />}
          {center ? isDom(center, 'center') : <span></span>}
          {right ? right : <span style={{ width: '0.22rem', display: 'inline-block' }}></span>}
        </div>
        {children || null}
      </div>
    );
  }
}

export default connect()(withRouter(Header));
