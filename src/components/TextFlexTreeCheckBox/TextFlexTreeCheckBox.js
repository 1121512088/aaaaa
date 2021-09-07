import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import { Header, SearchAction, TreeCheckBox, MaskElement } from '@/components';
import { Api } from '@/helpers';

import styles from './TextFlexTreeCheckBox.less';

// className            样式class
// left:                左边元素
// center:              中间元素
// style: {}            样式
// onChange [function (选中数据)]
// value [受控] 列:[id, id, id]
// forIn: {}          便利的 key名字 例子: {name: 'name', id: 'id'}
// data: [] 默认数据

// 注意：传了request 自动请求数据，不给的不会请求，但是会默认匹配props传过来的data

// request: object 请求接口  例子： { url: '/product_categories', params: { search: { status: 'in_use' }, per_page: 5000 } }

class TextFlexTreeCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modle: '',
      inputValue: '',
      data: props.data || [],
      value: props.value ? props.value instanceof Array ? props.value : [props.value] : [],
      selectedKeys: [],
      rightText: '请选择',
      expandedKeys: [],
    };
  }

  componentDidMount() {
    const { url = '', params = {} } = this.props.request || {};

    if (url) {
      Api.get(`${url}`, params).then((res) => {
        if (res.success) {
          let data = res.results;
          this.handleSameCode(data);
          this.setState({
            data,
          });
        }
      });
    } else {
      this.handleSameCode();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.handleSameCode();
      this.setState({
        value: nextProps.value,
      });
    }
    if (nextProps.data !== this.props.data) {
      this.handleSameCode(nextProps.data, nextProps.value);
      this.setState({
        data: nextProps.data,
      });
    }
    return true;
  }

  handleSameCode = (data = this.state.data, value = this.state.value) => {
    if (value instanceof Array && value.length > 0) {
      let id = value[0].split('-')[value[0].split('-').length - 1];
      this.handleCallBack(data, id);
    } else {
      this.setState({
        rightText: '请选择',
        value: [],
        expandedKeys: [],
      });
    }
  }
  // 递归
  handleCallBack = (data, value, key) => {
    const { id = 'id', name = 'name' } = this.props.forIn || {};

    for (let i = 0; i < data.length; i++) {
      let v = data[i];
      let ids = key ? `${key}-${v[id]}` : v[id];
      let idarr = String(ids).split('-');

      if (idarr instanceof Array && idarr.length > 2 && Number(value) === v[id]) {
        let arr = [];
        for (let i = 0; i < idarr.length; i++) {
          let str = '';
          for (let j = 0; j <= i; j++) {
            str += `${idarr[j]}-`;
          }
          arr.push(str.substring(0, str.length - 1));
        }

        this.setState({
          rightText: v[name],
          value: [String(ids)],
          expandedKeys: arr,
        });
      } else {
        if (v.children instanceof Array && v.children.length > 0) {
          this.handleCallBack(v.children, Number(value), ids);
        }
      }
    }
  }

  handleMaskOpen = () => {
    this.setState({
      modle: 'mask',
    });
  }

  handleMaskClose = () => {
    const { value } = this.props;
    let value2 = value ? value instanceof Array ? value : [value] : [];
    this.handleSameCode(this.state.data, value2);

    this.setState({
      modle: '',
      inputValue: '',
      selectedKeys: [],
    });
  }

  handleSearchChange = (value) => {
    const { url, params } = this.props.request || {};
    const { id = 'id', name = 'name' } = this.props.forIn || {};

    this.setState({
      inputValue: value,
    });

    let site = 'props';
    if (url) {
      site = 'state';
    }
    if (value !== '') {
      let keys = [];
      this[site].data.forEach(v => {
        if (v[name] === value) {
          keys = [String(v[id])];
        }
      });
      this.setState({
        selectedKeys: keys,
      });
    } else {
      this.setState({
        selectedKeys: [],
      });
    }
  }

  handleCheckBoxChange = (checkArr) => {
    this.setState({
      value: checkArr,
    });
  }

  handleReset = () => {
    this.setState({
      value: [],
      inputValue: '',
      selectedKeys: [],
    });
  }

  handleSave = () => {
    this.handleSameCode();

    this.setState({
      modle: '',
      inputValue: '',
      selectedKeys: [],
    });

    this.props.onChange && this.props.onChange(this.state.value);
  }

  renderModle = () => {
    const { title, forIn } = this.props;
    const { inputValue, value, data, selectedKeys, expandedKeys } = this.state;

    switch (this.state.modle) {
      case 'mask':
        return (
          <MaskElement visible={true}>
            <div className={styles.Mask}>
              <Header leftnone={true} left={<Icon type="left" onClick={this.handleMaskClose} />}
                center={title ? `请选择${title}` : '请选择'}
                style={{ height: '0.88rem' }}>
                <div className={styles.Mask_search}>
                  <SearchAction value={inputValue} onChange={this.handleSearchChange} />
                </div>
              </Header>

              <div className={styles.Mask_content}>
                <TreeCheckBox forIn={forIn} data={data} value={value} selectedKeys={selectedKeys} expandedKeys={expandedKeys} onChange={this.handleCheckBoxChange} />
              </div>

              <div className={styles.Mask_footer}>
                <span onClick={this.handleReset}>重置</span>
                <span onClick={this.handleSave}>确认</span>
              </div>
            </div>
          </MaskElement>
        );
      default:
    }
  }

  render() {
    const { className = '', left, center, style = {} } = this.props;
    const { rightText } = this.state;

    let isDom = (dom) => {
      let domh = null;
      if (typeof dom === 'object') {
        domh = String(dom['$$typeof']).indexOf('element') ? dom : <span>{dom}</span>;
      } else {
        domh = <span>{dom}</span>;
      }
      return domh;
    };

    return (
      <div className={styles.TextFlexTreeCheckBox}>
        <div className={`${styles.TextFlex} ${className}`} style={style} onClick={this.handleMaskOpen}>
          {left ? isDom(left) : <span style={{ width: '0.22rem', display: 'inline-block' }}></span>}
          {center ? isDom(center) : <span></span>}
          <span className={styles.TextFlex_right}>{rightText}<Icon type={'right'} color="#ccc" /></span>
        </div>
        {this.renderModle()}
      </div>
    );
  }
}

TextFlexTreeCheckBox.propTypes = {
};

export default connect()(TextFlexTreeCheckBox);
