import React from 'react';
import { connect } from 'dva';
import { Header } from '@/components';

import styles from './index.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {

    return (
      <div className={styles.Home}>
        <Header className={styles.header} leftnone={true} center={'首页'} />
      </div>
    );
  }
}

export default connect(({ user, stock }) => {
  return {
    user,
    stock,
  };
})(Home);
