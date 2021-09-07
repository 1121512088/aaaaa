import React from 'react';
import { withRouter } from 'react-router-dom';
import { DatePicker } from 'antd-mobile';
import moment from "moment";
import styles from './DateSelect.less';

class DateSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      visible: false,
      startDate: props.dateValue instanceof Array && props.dateValue.length > 0 ? props.dateValue[0] : null,
      date2: null,
      visible2: false,
      endDate: props.dateValue instanceof Array && props.dateValue.length > 0 ? props.dateValue[1] : null,
    };
  }

  componentDidMount() {
    const { startDate, endDate } = this.state;
    if (startDate !== null) {
      this.setState({
        date: new Date(startDate),
      });
    }
    if (endDate !== null) {
      this.setState({
        date2: new Date(endDate),
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.dateValue instanceof Array) {
      if (nextProps.dateValue[0] !== this.props.dateValue[0]) {
        this.setState({
          startDate: nextProps.dateValue[0],
          date: nextProps.dateValue[0] ? new Date(nextProps.dateValue[0]) : null,
        });
      }
      if (nextProps.dateValue[1] !== this.props.dateValue[1]) {
        this.setState({
          endDate: nextProps.dateValue[1],
          date2: nextProps.dateValue[1] ? new Date(nextProps.dateValue[1]) : null,
        });
      }
    }
    return true;
  }

  handleStartOK = async (date) => {
    await this.setState({
      date: date,
      visible: !this.state.visible,
      startDate: moment(date).format('YYYY-MM-DD'),
    });
    await this.handleSave();
  }

  handleEndOK = async (date) => {
    await this.setState({
      date2: date,
      visible2: !this.state.visible2,
      endDate: moment(date).format('YYYY-MM-DD'),
    });
    await this.handleSave();
  }

  handleReset = async () => {
    await this.setState({
      startDate: null,
      endDate: null,
    });
    await this.handleSave();
  }

  handleSave = () => {
    const { startDate, endDate } = this.state;
    this.props.onChange && this.props.onChange([startDate, endDate]);
  }

  handleStartClose = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  handleEndClose = () => {
    this.setState({
      visible2: !this.state.visible2,
    });
  }

  render() {
    const { date, visible, startDate, date2, visible2, endDate } = this.state;
    // dateValue 受控: [开始时间 , 结束时间] 列:['2019-06-06', '2019-06-31']
    // onChange Fn事件 chang触发
    return (
      <div className={styles.DateSelect}>
        <DatePicker
          mode="date"
          title="选择时间"
          extra="Optional"
          value={date}
          visible={visible}
          onOk={this.handleStartOK}
          onDismiss={this.handleStartClose}
        />
        <div className={styles.dateContent}>
          <div className={styles.tag} onClick={this.handleStartClose}>
            {startDate || <span className={styles.spanColor}>选择开始时间</span>}
          </div>
          <div className={styles.border}></div>
          <div className={styles.tag} onClick={this.handleEndClose}>
            {endDate || <span className={styles.spanColor}>选择结束时间</span>}
          </div>
          {startDate || endDate ? <span className={styles.DateReset} onClick={this.handleReset}>重置</span> : null}
        </div>
        <DatePicker
          mode="date"
          title="选择时间"
          extra="Optional"
          value={date2}
          visible={visible2}
          onOk={this.handleEndOK}
          onDismiss={this.handleEndClose}
        />
      </div>
    );
  }
}

DateSelect.propTypes = {
};

export default withRouter(DateSelect);
