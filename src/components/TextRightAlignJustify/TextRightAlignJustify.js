import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import styles from './TextRightAlignJustify.less';

// 公用textAlignRight 两端对其 布局
// className            样式class
// left:                左边元素
// right:               右边元素
// style: {}            样式

class TextRightAlignJustify extends React.Component {
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
      <div className={`${styles.TextRightAlignJustify} ${className}`} style={style}>
        <span className={styles.TextRightAlignJustify_span1}>{left || '无'}</span>
        ：
        <span className={styles.TextRightAlignJustify_span2}>{right || '无'}</span>
      </div>
    );
  }
}

TextRightAlignJustify.propTypes = {
};

export default connect()(withRouter(TextRightAlignJustify));
