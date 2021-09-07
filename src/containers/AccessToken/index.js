import React from 'react';
import { PathLocation } from '@/router';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import { ActionCableProvider } from "actioncable-client-react";
import { Api, I18n } from '@/helpers';
import config from '@/config';

import styles from './index.less';

const WSS_URL = `ws://${config.apiHost}/cable?token=${localStorage.getItem('accessToken')}`;

class AccessToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    window.success = Toast.success;
    window.loading = Toast.loading;
    window.loadingHide = Toast.hide;
    window.info = Toast.info;
    window.fail = Toast.fail;

    // window.onunload = () => {
    //   return true;
    // };
  }

  componentDidMount() {
    this.props.dispatch({ type: 'accessToken/i18n' });

    // let token = localStorage.getItem('accessToken');
    let token =localStorage.accessToken;
    if (token) {
      // Api.post('/auth/check', { access_token: token }).then(res => {
      //   if (res.success) {
      //     this.props.dispatch({ type: 'accessToken/username', payload: { user: res.user, username: res.user.nikname } });
      //   }
      //   if (!res.success) {
      //     let pathname = this.props.history.location.pathname;
      //     if (pathname !== '/404') {
      //       localStorage.removeItem('accessToken');
      //       // this.props.history.push(`${PathLocation()}/login`);
      //     }
      //   }
      // });
    } else {
      // this.props.history.push(`${PathLocation()}/login`);
    }

    window.onload = () => {
      document.addEventListener('gesturestart', (e) => {
        e.preventDefault();
      });
      document.addEventListener('dblclick', (e) => {
        e.preventDefault();
      });
      document.addEventListener('touchstart', (event) => {
        // 禁止ios 橡皮筋
        if (document.querySelector('.am-toast-mask')) {
          document.querySelector('.am-toast-mask').addEventListener('touchmove', function (e) {
            e.preventDefault();
          }, { passive: false });
        }
        if (document.querySelector('.header_touchmove')) {
          document.querySelector('.header_touchmove').addEventListener('touchmove', function (e) {
            e.preventDefault();
          }, { passive: false });
        }
        if (document.querySelector('.footer_touchmove')) {
          document.querySelector('.footer_touchmove').addEventListener('touchmove', function (e) {
            e.preventDefault();
          }, { passive: false });
        }
        // ---------------------- \\
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      var lastTouchEnd = 0;
      document.addEventListener('touchend', (event) => {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    };
  }

  render() {
    const { children } = this.props;
    return (
      <ActionCableProvider url={WSS_URL}>
        <div className={styles.AccessToken}>
          {children}
        </div>
      </ActionCableProvider>
    );
  }
}
export default connect()(AccessToken);
