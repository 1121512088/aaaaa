import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from 'react-router-dom';

import styles from './MaskElement.less';

// visible: bool true/false true 创建 false 删除

let body = document.querySelector('body');

class MaskElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
    };
    this.el = document.createElement('div');
    this.el.id = 'Mask_c';
    this.el.className = styles.Mask_c;
  }

  componentDidMount() {
    if (this.state.visible) {
      if (!document.querySelector('#Mask_c')) {
        body.appendChild(this.el);
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        if (!document.querySelector('#Mask_c')) {
          body.appendChild(this.el);
        }
      } else {
        if (document.querySelector('#Mask_c')) {
          body.removeChild(this.el);
        }
      }
    }
    return true;
  }

  componentWillUnmount() {
    if (document.querySelector('#Mask_c')) {
      body.removeChild(this.el);
    }
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default withRouter(MaskElement);
