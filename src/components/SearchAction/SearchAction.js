import React from 'react';
import { connect } from 'dva';
import { SearchBar } from 'antd-mobile';

import styles from './SearchAction.less';

// 公用搜索
// className            样式class
// style: {}            样式
// value: ''         受控value
// onSubmit: Fn     键盘 enter触发
// onChange: Fn     触发
// onClear: Fn     清楚

class SearchAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancelButton: false,
      value: props.value || '',
      timeout: null,
    };
    this.bol = true;
    this.count = 0;
  }

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
    return true;
  }

  handleFocus = () => {
    this.setState({
      showCancelButton: true,
    });
  }

  handleSubmit = (value) => {
    this.setState({
      value,
    });
    this.props.onSubmit && this.props.onSubmit(value.replace(/\s*/g, ""));
  }

  handleCompositionStart = () => {
    this.bol = false;
    this.count = 0;
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
    if (this.bol) {
      clearTimeout(this.state.timeout);
      this.setState({
        timeout: setTimeout(() => {
          this.props.onChange && this.props.onChange(value.replace(/\s*/g, ""));
        }, 500),
      });
    }
  }

  handleCompositionEnd = (e) => {
    this.bol = true;
    if (this.count === 0) {
      clearTimeout(this.state.timeout);
      this.setState({
        timeout: setTimeout(() => {
          this.props.onChange && this.props.onChange(this.state.value.replace(/\s*/g, ""));
        }, 500),
      });
    }
    this.count++;
  }

  handleClear = (value) => {
    this.setState({
      value,
    });
    this.props.onClear && this.props.onClear(value);
  }

  render() {
    const { showCancelButton, value } = this.state;
    const { className = '', style } = this.props;
    let obj = Object.assign({}, style);

    let SearchBarDom = document.querySelector(`.${styles.SearchAction_SearchBar}`);
    if (SearchBarDom) {
      let inputDom = SearchBarDom.querySelector('input');
      inputDom.addEventListener('compositionstart', (e) => {
        this.handleCompositionStart();
      });
      inputDom.addEventListener('compositionend', (e) => {
        this.handleCompositionEnd();
      });
    }

    return (
      <div className={`${styles.SearchAction} ${className}`} style={obj}>
        <SearchBar className={styles.SearchAction_SearchBar} placeholder="搜索"
          value={value}
          onFocus={this.handleFocus}
          showCancelButton={showCancelButton}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onClear={this.handleClear} />
      </div>
    );
  }
}
export default connect()(SearchAction);
