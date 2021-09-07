import React from 'react';
import { connect } from 'dva';
import { List, Checkbox } from 'antd-mobile';
import styles from './RadioList.less';

// data:[] 数组 [必须]
// forIn: {}          便利的 key名字 例子: {name: 'name', id: 'id'}
// onChange [function (选中数据)]   params([当前全部选中数据id]，选中数据)
// value [受控] 列:[id, id, id]

const CheckboxItem = Checkbox.CheckboxItem;

class RadioList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
      value: props.value || '',
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data,
      });
    }
    return true;
  }

  handleChange = (item) => {
    const { id = 'id' } = this.props.forIn || {};
    this.setState({
      value: item[id],
    });
    this.props.onChange && this.props.onChange(item[id], item);
  }

  render() {
    const { name = 'name', id = 'id' } = this.props.forIn || {};
    const { data, value } = this.state;

    let newValue = value;
    if (isNaN(value)) {
      newValue = value;
    } else {
      newValue = Number(value);
    }

    return (
      <div className={styles.me_RadioList}>
        <List className={styles.me_RadioList_list}>
          {data !== null && data instanceof Array && data.map((item, index) => {
            return (
              <CheckboxItem key={index} checked={item[id] === newValue} onChange={() => this.handleChange(item)}>
                <div className={styles.me_RadioList_list_item}>
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
export default connect()(RadioList);
