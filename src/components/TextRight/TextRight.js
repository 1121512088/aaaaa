import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import styles from './TextRight.less';

// 公用textAlignRight 布局
// className            样式class
// left:                左边元素
// right:               右边元素
// style: {}            样式

class TextRight extends React.Component {
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
      <div className={`${styles.TextRight} ${className}`} style={style}>
        <span className={styles.TextRight_span1}>{left || '无'}：</span>
        <span className={styles.TextRight_span2}>{right || '无'}</span>
      </div>
    );
  }
}

TextRight.propTypes = {
};

export default connect()(withRouter(TextRight));
