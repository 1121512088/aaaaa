import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './TextBox.less';

// className 样式名字
// left 左边的内容
// style 样式
// placeholder 文本框提示
// value: String input框值
// onChange: Fn 回调的value

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
    return true;
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
    this.props.onChange && this.props.onChange(e.target.value);
  }

  render() {
    const { className = '', left = '', style = {}, placeholder = '请输入' } = this.props;
    const { value } = this.props;

    return (
      <div className={`${styles.TextBox} ${className}`} style={style}>
        {left}
        <div className={styles.textarea_parent}>
          <textarea className={styles.textarea} value={value} placeholder={placeholder} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

TextBox.propTypes = {
};

export default connect()(TextBox);
