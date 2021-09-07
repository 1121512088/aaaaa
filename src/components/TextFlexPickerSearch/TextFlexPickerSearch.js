import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import { Header, SearchAction, RadioList, MaskElement } from '@/components';
import { Api } from '@/helpers';

import styles from './TextFlexPickerSearch.less';

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

class TextFlexPickerSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modle: '',
      inputValue: '',
      data: props.data || [],
      value: props.value || '',
      rightText: '请选择',
    };
  }

  componentDidMount() {
    const { url = '', params = {} } = this.props.request || {};

    if (this.props.data) {
      this.handleSameCode(this.props.data);
    } else {
      Api.get(`${url}`, params).then((res) => {
        if (res.success) {
          let data = res.results;
          this.handleSameCode(data);
          this.setState({
            data,
          });
        }
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
    if (nextProps.data !== this.props.data) {
      this.handleSameCode(nextProps.data);
      this.setState({
        data: nextProps.data,
      });
    }
    return true;
  }

  handleSameCode = (data) => {
    const { id = 'id', name = 'name' } = this.props.forIn || {};
    let rightText = '请选择';
    const { value } = this.state;
    let newValue = value;

    if (isNaN(value)) {
      newValue = value;
    } else {
      newValue = Number(value);
    }
    data.forEach(item => {
      if (newValue === item[id]) {
        rightText = item[name];
      }
    });
    this.setState({
      rightText,
    });
  }

  handleMaskOpen = () => {
    this.setState({
      modle: 'mask',
    });
  }

  handleMaskClose = () => {
    this.setState({
      modle: '',
      value: this.props.value,
      inputValue: '',
    });
    this.handleSearchChange('');
  }

  handleSearchChange = (value) => {
    const { url, params } = this.props.request;
    this.setState({
      inputValue: value,
    });
    let search = { ...params.search, query: value };
    Object.assign(params.search, search);
    Api.get(`${url}`, params).then(res => {
      if (res.success) {
        this.setState({
          data: res.results,
        });
      }
    });
  }

  handleRadioChange = (value) => {
    this.setState({
      value,
    });
  }

  handleReset = () => {
    this.setState({
      value: '',
      inputValue: '',
    });
    this.handleSearchChange('');
  }

  handleSave = () => {
    this.handleSameCode(this.state.data);
    this.handleSearchChange('');
    this.setState({
      inputValue: '',
      modle: '',
    });
    this.props.onChange && this.props.onChange(String(this.state.value));
  }

  renderModle = () => {
    const { title, forIn } = this.props;
    const { inputValue, value, data } = this.state;

    switch (this.state.modle) {
      case 'mask':
        return (
          <MaskElement visible={this.state.modle}>
            <div className={styles.Mask} >
              <Header leftnone={true} left={<Icon type="left" onClick={this.handleMaskClose} />}
                center={title ? `请选择${title}` : '请选择'}
                style={{ height: '0.88rem' }}>
                <div className={styles.Mask_search}>
                  <SearchAction value={inputValue} onChange={this.handleSearchChange} />
                </div>
              </Header>

              <div className={styles.Mask_content}>
                <RadioList data={data} value={value} forIn={forIn} onChange={this.handleRadioChange} />
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
      <div className={styles.TextFlexPickerSearch}>
        <div className={`${styles.TextFlex} ${className}`} style={style} onClick={this.handleMaskOpen}>
          {left ? isDom(left) : <span style={{ width: '0.22rem', display: 'inline-block' }}></span>}
          {center ? isDom(center) : <span></span>}
          <span className={styles.TextFlex_right}>{rightText}<Icon type={'right'} color="#ccc" /></span>
        </div>

        { this.renderModle() }
      </div>
    );
  }
}
export default connect()(TextFlexPickerSearch);
