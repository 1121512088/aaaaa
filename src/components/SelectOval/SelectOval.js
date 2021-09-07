import React, { Component } from 'react';
import { connect } from 'dva';
import { Select } from 'antd';

import styles from './SelectOval.less';

// className            样式class
// style: {}            样式
// data: []             数据源
// forIn: {}          便利的 key名字 例子: {name: 'name', id: 'id'}
// placeholder         选择框默认文字
// onChange: fn            事件

// value:     string|string[]\ number|number[]\

const { Option } = Select;

class SelectOval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
      value: props.value || '',
    };
  }

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value || nextProps.data !== this.props.data) {
      this.setState({
        value: nextProps.value,
        data: nextProps.data,
      });
    }
    return true;
  }

  handleChange = (value) => {
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    const { className = '', forIn = {}, placeholder = '请选择', style } = this.props;
    const { data, value } = this.state;
    const { id = 'id', name = 'name' } = forIn;
    let obj = Object.assign({}, style);
    return (
      <div className={`${styles.SelectOval} ${className}`} style={obj}>
        <Select allowClear
          placeholder={placeholder}
          onChange={this.handleChange}
          value={value || []}
        >
          {
            data.map((item, index) => {
              return (
                <Option key={index} value={item[id]}>{item.name}</Option>
              );
            })
          }
        </Select>
      </div>
    );
  }
}

SelectOval.propTypes = {
};

export default connect()(SelectOval);
