import React from 'react';
import { connect } from 'dva';
import { InputItem } from 'antd-mobile';
import styles from './TextFlexInput.less';

// 公用头部
// className            样式class
// left:                左边元素
// style: {}            样式
// placeholder          默认提示
// defaultValue        设置初始默认值
// type                 文本类型
// disabled            是否禁用

class TextFlex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || '',
    };
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

  handleChange = (value) => {
    this.setState({
      value,
    });
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    const { className = '', left, type, placeholder, disabled = false, style = {} } = this.props;
    const { value } = this.state;

    return (
      <InputItem
        className={`${styles.TextFlexInput} ${className}`}
        style={style}
        value={value}
        clear
        type={type || 'text'}
        placeholder={placeholder || `请输入`}
        disabled={disabled}
        onChange={this.handleChange}
      >{left}</InputItem>
    );
  }
}

TextFlex.propTypes = {
};

export default connect()(TextFlex);
