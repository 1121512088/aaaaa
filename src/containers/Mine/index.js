import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Header } from '@/components';

class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={styles.Mine}>
        <Header className={styles.header} leftnone={true} center={'我的'}/>
      </div>
    );
  }
}

export default connect()(Mine);
