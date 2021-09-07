import React from 'react';
import { withRouter } from 'react-router-dom';
import { List, Checkbox } from 'antd-mobile';
import { Api } from '@/helpers';
import styles from './CheckboxList.less';

// data:[] 数组 [必须]
// forIn: {}          便利的 key名字 例子: {name: 'name', id: 'id'}
// onChange [function (选中数据)]   params([当前全部选中数据id]，选中数据, [上一次选中])
// value [受控] 列:[id, id, id]

// 注意：传了request 自动请求数据，不给的不会请求，但是会默认匹配props传过来的data

// request: object 请求接口  例子： { url: '/product_categories', params: { search: { status: 'in_use' }, per_page: 5000 } }

const CheckboxItem = Checkbox.CheckboxItem;

class CheckboxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
      data: props.data || [],
      oldCheckArr: [],
    };
  }

  componentDidMount() {
    const { request } = this.props;
    if (request) {
      const { url, params } = request;
      if (url) {
        Api.get(url, params).then(res => {
          if (res.success) {
            this.handleSameCode(res.results, this.state.value);
          }
        });
      }
    } else {
      this.handleSameCode(this.state.data, this.state.value);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value || nextProps.data !== this.props.data) {
      const { request } = this.props;
      if (request) {
        const { url, params } = request;
        if (url) {
          this.handleSameCode(this.state.data, nextProps.value);
        }
      } else {
        this.handleSameCode(nextProps.data, nextProps.value);
      }

      this.setState({
        value: nextProps.value,
      });
    }
    return true;
  }

  handleSameCode = async (data, value) => {
    const { id = 'id' } = this.props.forIn || {};
    let arr = [];
    data instanceof Array && data.forEach((item) => {
      arr.push(Object.assign(item, { checked_l: false }));
    });
    arr.forEach((item) => {
      value instanceof Array && value.forEach((key) => {
        if (item[id] === key) {
          Object.assign(item, { checked_l: true });
        }
      });
    });
    this.setState({
      data: arr,
    });
  }

  handleChange = (item) => {
    const { id = 'id' } = this.props.forIn || {};
    const { data } = this.state;
    let arr = [];
    let checkedArr = [];
    data.forEach((val) => {
      if (val[id] === item[id]) {
        arr.push(Object.assign(val, { checked_l: !item.checked_l }));
      } else {
        arr.push(val);
      }
      if (val.checked_l) {
        checkedArr.push(val[id]);
      }
    });
    this.setState({
      data: arr,
      oldCheckArr: checkedArr,
    });
    this.props.onChange && this.props.onChange(checkedArr || [], item, this.state.oldCheckArr);
  }

  render() {
    const { name = 'name' } = this.props.forIn || {};
    const { data } = this.state;

    return (
      <div className={styles.me_CheckboxList}>
        <List className={styles.me_CheckboxList_list}>
          {data !== null && data instanceof Array && data.map((item, index) => {
            return (
              <CheckboxItem key={index} checked={item.checked_l} onChange={() => this.handleChange(item)}>
                <div className={styles.me_CheckboxList_list_item}>
                  {item[name]}
                </div>
              </CheckboxItem>
            );
          })}
        </List>
      </div>
    );
  }
}

CheckboxList.propTypes = {
};

export default withRouter(CheckboxList);
