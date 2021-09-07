import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { DatePicker, List } from 'antd-mobile';
import styles from './TextFlexDatePicker.less';

// 公用头部
// className            样式class
// style: {}            样式
// date: []         默认值
// disabled: bol         是否可用
// arrow: string            箭头方向(右,上,下), 可选horizontal,up,down,empty，如果是empty则存在对应的dom,但是不显示
// arrowNone: bol        是否箭头隐藏

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class TextFlexDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || now,
      data: [],
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

  handleOK = (value) => {
    this.setState({ value });
    this.props.onOk && this.props.onOk(value);
  }

  handleChange = (value) => {
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    const { className = '', left = '', style = {}, disabled = false, arrow = 'horizontal', arrowNone = false } = this.props;
    const { value } = this.state;
    return (
      <DatePicker
        mode="date"
        extra="请选择"
        value={value}
        onOk={this.handleOK}
        onChange={this.handleChange}
        disabled={disabled}
      >
        <List.Item className={`${styles.DatePicker} ${className} ${arrowNone ? styles.DatePicker_arrow : ''}`} style={style} arrow={arrow}>
          {left}
        </List.Item>
      </DatePicker>
    );
  }
}

TextFlexDatePicker.propTypes = {
};

export default connect()(withRouter(TextFlexDatePicker));
