import React from 'react';
import { withRouter } from 'react-router-dom';
import { Api } from '@/helpers';
import styles from './Checkbox.less';

// 功能： 多选复选框
// data:[] 数组 [必须]
// forIn: {}          便利的 key名字 例子: {name: 'name', id: 'id'}
// onToDetails [function() ] 省略号点击
// onChange [function (选中数据)]
// value [受控] 列:[id, id, id]

// 注意：传了request 自动请求数据，不给的不会请求，但是会默认匹配props传过来的data

// request: object 请求接口  例子： { url: '/product_categories', params: { search: { status: 'in_use' }, per_page: 5000 } }

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
      data: props.data || [],
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
    if (nextProps.data !== this.props.data || nextProps.value !== this.props.value) {
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

  handleSameCode = (data, value) => {
    const { id = 'id' } = this.props.forIn || {};
    let arr = [];
    if (data instanceof Array && data.length > 0) {
      data.forEach((item) => {
        arr.push(Object.assign(item, { checked: false }));
      });
      arr.forEach((item) => {
        value instanceof Array && value.forEach((key) => {
          if (item[id] === key) {
            Object.assign(item, { checked: true });
          }
        });
      });
    }
    this.setState({
      data: arr,
    });
  }

  handleTagChange = (item) => {
    const { id = 'id' } = this.props.forIn || {};
    const { data } = this.state;
    let arr = [];
    let checkedArr = [];
    data.forEach((val) => {
      if (val[id] === item[id]) {
        arr.push(Object.assign(val, { checked: !item.checked }));
      } else {
        arr.push(val);
      }
      if (val.checked) {
        checkedArr.push(val[id]);
      }
    });
    this.setState({
      data: arr,
    });
    this.props.onChange && this.props.onChange(checkedArr || []);
  };
  // 省略号点击
  handleToDetails = () => {
    this.props && this.props.onToDetails();
  }

  renderTag = () => {
    const { name = 'name' } = this.props.forIn || {};
    const { data } = this.state;
    let length = data.length;
    let len = length;
    if (length > 8) {
      len = 8;
    }
    return (
      data !== null && data instanceof Array && data.map((item, index) => {
        if (len > index) {
          return (
            item[name] ? <div className={styles.CheckboxList} key={index}>
              <span className={item.checked ? styles.tag_active : styles.tag}
                onClick={this.handleTagChange.bind(this, item)}
              >
                {item[name]}
              </span>
            </div> : null
          );
        } else {
          return null;
        }
      })
    );
  }

  render() {
    const { data } = this.state;

    return (
      <div className={styles.me_Checkbox}>
        {this.renderTag()}
        {
          data instanceof Array && data.length > 8 ? <div className={styles.tag} onClick={this.handleToDetails} >...</div> : null
        }
      </div>
    );
  }
}

Checkbox.propTypes = {
};

export default withRouter(Checkbox);
