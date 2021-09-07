import React from 'react';
import PropTypes from 'prop-types';
import { PullToRefresh } from 'antd-mobile';

import styles from './PullRefresh.less';

// 下拉加载
// direction: String 'up'/'down' 拉动刷新方向[可选] 默认'up'
// onRefresh: Function           拉动刷新触发的函数[可选]
// className: 类名

class PullRefresh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  onRefresh = () => {
    this.props.onRefresh && this.props.onRefresh();
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  }

  render() {
    const { className = '', direction = 'up' } = this.props;
    return (
      <PullToRefresh
        className={`${styles.PullToRefresh} ${className}`}
        damping={60}
        ref={el => this.ptr = el}
        style={{}}
        indicator={{ deactivate: direction === 'up' ? '下拉可以刷新' : '上拉可以刷新' }}
        direction={direction}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      >
        {this.props.children || null}
      </PullToRefresh>
    );
  }
}

PullRefresh.propTypes = {
  direction: PropTypes.string,
  children: PropTypes.object,
  onRefresh: PropTypes.func,
};

export default PullRefresh;
