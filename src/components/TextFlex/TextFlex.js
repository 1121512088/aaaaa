import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import styles from './TextFlex.less';

// 公用头部
// className            样式class
// left:                左边元素
// center:              中间元素
// right:               右边元素
// style: {}            样式

class TextFlex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { className = '', left, center, right, style = {} } = this.props;

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
      <div className={`TextFlex_bg ${className}`} style={style}>
        {left ? isDom(left) : <span style={{ width: '0.22rem', display: 'inline-block' }}></span>}
        {center ? isDom(center) : <span></span>}
        {right ? isDom(right) : <span style={{ width: '0.22rem', display: 'inline-block' }}></span>}
      </div>
    );
  }
}

TextFlex.propTypes = {
};

export default connect()(withRouter(TextFlex));
