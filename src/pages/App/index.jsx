import React from 'react';
import { connect } from 'dva';
import { getPaths } from '@/router';

import styles from './index.less';

const paths = getPaths();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      fullScreen: false,
    };
  }

  handleClick = (item, index) => {
    this.props.history.push(`${paths.rootPath}/${item.key}`);
  }

  render() {
    const { TabKey } = this.state;
    let footerD = [
      {
        icon: '',
        icon_v: '',
        name: '首页',
        key: 'home',
      },
      {
        icon: '',
        icon_v: '',
        name: '我的',
        key: 'mine',
      },
    ];
    let pathname = this.props.location.pathname.split(`${paths.rootPath}/`)[1] || 'home';

    return (
      <div className={styles.App}>
        {this.props.children || null}
        {/* <div className={styles.App_content}>
          {this.props.children || null}
        </div>
        <div className={`${styles.App_footer} footer_touchmove`}>
          {
            footerD.map((item, index) => {
              return (
                <ul key={index} onClick={this.handleClick.bind(this, item, index)}>
                  <li>{pathname === item.key ? item.icon_v : item.icon}</li>
                  <li className={pathname === item.key ? styles.App_footer_active : ''}>{item.name}</li>
                </ul>
              );
            })
          }
        </div> */}
      </div>
    );
  }
}
export default connect()(App);
