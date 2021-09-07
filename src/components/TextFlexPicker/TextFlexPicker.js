import React from 'react';
import { connect } from 'dva';
import { Picker, List } from 'antd-mobile';
import { Api } from '@/helpers';
import styles from './TextFlexPicker.less';

// 公用头部
// className            样式class
// left: Element || string             左边内容
// style: {}            样式
// itemStyle: {}        下拉内样式
// forIn: {}          便利的 key名字 例子: {name: 'name', id: 'id'}
// value: []         默认值
// onChange: fn         触发每次
// onOk: fn             确认
// disabled: bol         是否禁用
// arrow: string            箭头方向(右,上,下), 可选horizontal,up,down,empty，如果是empty则存在对应的dom,但是不显示
// arrowNone: bol        是否箭头隐藏
// multiple: bol        onChange返回true/数组 false/id字符串

// 注意：传了request 自动请求数据，不给的不会请求，但是会默认匹配props传过来的data

// request: object 请求接口  例子： { url: '/product_categories', params: { search: { status: 'in_use' }, per_page: 5000 } }

class TextFlexPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
      value: props.value || [],
    };
  }

  componentDidMount() {
    const { request, forIn = {} } = this.props;
    const { name = 'name', id = 'id' } = forIn;

    if (request) {
      const { url, params } = request;
      if (url) {
        Api.get(url, params).then(res => {
          if (res.success) {
            let arr = [];
            res.results.forEach(v => {
              arr.push({
                label: v[name],
                value: v[id],
              });
            });
            this.setState({
              data: arr,
            });
          }
        });
      }
    } else {
      let arr = [];
      this.props.data instanceof Array && this.props.data.forEach(v => {
        arr.push({
          label: v[name],
          value: v[id],
        });
      });
      this.setState({
        data: arr,
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value || [],
      });
    }
    return true;
  }

  handleOk = (value) => {
    this.setState({
      value,
    });
    if (this.props.multiple) {
      this.props.onOk && this.props.onOk(value);
    } else {
      this.props.onOk && this.props.onOk(String(value[0]));
    }
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
    if (this.props.multiple) {
      this.props.onChange && this.props.onChange(value);
    } else {
      this.props.onChange && this.props.onChange(String(value[0]));
    }
  }

  render() {
    const { className = '', left = '', style = {}, itemStyle = {}, disabled = false, arrow = 'horizontal', arrowNone = false } = this.props;
    const { data, value } = this.state;

    let data2 = [
      {
        label: '无',
        value: 1,
      },
    ];
    let bol = false;
    if (disabled && value.length === 0) {
      bol = true;
    }

    let newValue = Array.from([]);
    // multiple使用判断逻辑
    if (value instanceof Array) {
      newValue = value;
    } else {
      newValue.push(isNaN(value) ? value : Number(value));
    }

    return (
      <Picker
        data={bol ? data2 : data}
        cols={1}
        value={bol ? [1] : newValue}
        itemStyle={itemStyle}
        onOk={this.handleOk}
        onChange={this.handleChange}
        disabled={disabled}
      >
        <List.Item className={`${styles.Picker} ${className} ${arrowNone ? styles.Picker_arrow : ''}`} style={style} arrow={arrow}>
          {left}
        </List.Item>
      </Picker>

    );
  }
}

TextFlexPicker.propTypes = {
};

export default connect()(TextFlexPicker);
