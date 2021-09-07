import React from 'react';
import { withRouter } from 'react-router-dom';

import styles from './SquareCheckbox.less';

// data:[] 数组 [必须]
// forIn: {}          便利的 key名字 例子: {name: 'name', id: 'id'}
// onChange [function (选中数据)]
// value [受控] 列:[id, id, id]

class SquareCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
      data: props.data || [],
    };
  }

  componentDidMount() {
    this.handleSameCode(this.state.data, this.state.value);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.data !== this.props.data || nextProps.value !== this.props.value) {
      this.handleSameCode(nextProps.data, nextProps.value);
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

  render() {
    const { name = 'name' } = this.props.forIn || {};
    const { data } = this.state;
    return (
      <div className={styles.me}>
        {
          data !== null && data instanceof Array && data.map((item, index) => {
            return (
              <div className={styles.list} key={index}>
                <span className={item.checked ? styles.tag_active : styles.tag}
                  onClick={this.handleTagChange.bind(this, item)}
                >
                  {item[name]}
                </span>
              </div>
            );
          })
        }
      </div>
    );
  }
}

SquareCheckbox.propTypes = {
};

export default withRouter(SquareCheckbox);
