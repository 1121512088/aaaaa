import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './template.less';

class template extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.template}>
      </div>
    );
  }
}

template.propTypes = {
};

export default connect()(template);
