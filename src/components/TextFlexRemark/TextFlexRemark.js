import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import styles from './TextFlexRemark.less';

// 公用页面备注字段 布局
// className            样式class
// left:                左边元素
// right:               右边元素
// style: {}            样式

class TextFlexRemark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { className = '', left, right, style = {} } = this.props;

    return (
      <div className={`${styles.TextFlexRemark} ${className}`} style={style}>
        <span className={styles.TextFlexRemark_span1}>{left || '无'}</span>
        <span className={styles.TextFlexRemark_span2}>{right || '无'}</span>
      </div>
    );
  }
}

TextFlexRemark.propTypes = {
};

export default connect()(withRouter(TextFlexRemark));
