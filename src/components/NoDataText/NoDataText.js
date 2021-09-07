import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './NoDataText.less';

class NoDataText extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.NoDataText}>
        暂无数据
      </div>
    );
  }
}

NoDataText.propTypes = {
};

export default connect()(NoDataText);
