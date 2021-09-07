import React from 'react';
import { connect } from 'dva';
import Exception from 'ant-design-pro/lib/Exception';

class RouteError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        {/* 404页面丢失 */}
        <Exception type="404" backText="返回主页" />
      </div>
    );
  }
}

RouteError.propTypes = {
};

export default connect()(RouteError);
