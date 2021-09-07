import React from 'react';
import { connect } from 'dva';
import styles from './DrawerAction.less';

// 抽屉
// className            样式class
// visible: bol         可见不可见
// onClose  Fn          关闭触发
// style: {}            样式

class DrawerAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({
        visible: nextProps.visible,
      });
    }
    return true;
  }

  handleClick = (e) => {
    let el = e || window.event;

    if (el.stopPropagation) {
      el.stopPropagation();
    } else {
      el.cancelBubble = true;
    }

    this.setState({
      visible: !this.state.visible,
    });
    this.props.onClose && this.props.onClose();
  }

  handleMaskClick = (e) => {
    let el = e || window.event;

    if (el.stopPropagation) {
      el.stopPropagation();
    } else {
      el.cancelBubble = true;
    }
  }

  render() {
    const { className = '', style = {}, children } = this.props;
    const { visible } = this.state;
    return (
      <div className={`${styles.drawerAction} ${visible ? '' : styles.active}`} onClick={this.handleClick}>
        <div className={`${styles.drawerAction_mask} ${className}`} onClick={this.handleMaskClick} style={style}>
          {children || null}
        </div>
      </div>
    );
  }
}

DrawerAction.propTypes = {
};

export default connect()(DrawerAction);
