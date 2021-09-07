import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './index.less';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.Template}>
      </div>
    );
  }
}

Template.propTypes = {
};

export default connect()(Template);
