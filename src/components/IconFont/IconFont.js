import React, { Component } from 'react';
import { Icon } from 'antd';

class Svg extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  }

  render() {
    const { className = '', type = '', style = {} } = this.props;
    // className 类名
    // type      矢量库名字
    // style     样式
    // onClick   点击事件

    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: "https://at.alicdn.com/t/font_1453011_dhavcylm09f.js"
    });

    return (
      <IconFont className={className} type={type} style={style} onClick={this.handleClick} />
    );
  }
}

Svg.propTypes = {
};

export default Svg;
