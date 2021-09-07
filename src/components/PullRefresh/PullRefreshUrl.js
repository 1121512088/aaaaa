import React from 'react';
import PropTypes from 'prop-types';
import { PullToRefresh } from 'antd-mobile';
import { Api } from '@/helpers';

// 下拉加载
// direction: String 'up'/'down' 拉动刷新方向[可选] 默认'up'
// onRefresh: Function           拉动刷新触发的函数[可选]
// url: ''                       请求

class PullRefresh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      listData: [],
      page: 2,
    };
  }

  componentDidMount() {
    const { url } = this.props;
    if (url) {
      Api.get(`${url}`).then(res => {
        if (res.success) {
          this.setState({
            listData: res.results,
          });
          this.props.onRefresh && this.props.onRefresh(res.results || []);
        }
      });
    }
  }

  onRefresh = () => {
    const { url } = this.props;
    const { listData, page } = this.state;
    if (url) {
      Api.get(`${url}`, { page }).then(res => {
        if (res.success) {
          let arr = listData.map(v => v);
          res.results.forEach(v => {
            arr.push(v);
          });
          this.setState({
            listData: arr,
            page: page + 1,
          });
        }
      });
    }
    this.props.onRefresh && this.props.onRefresh(listData || []);
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  }

  render() {
    const { direction = 'up' } = this.props;

    return (
      <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: '100%',
          overflow: 'auto',
          touchAction: 'none',
        }}
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
