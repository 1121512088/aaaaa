import React, { Component } from 'react';
import { connect } from 'dva';
import { HostLocation } from '@/router';
import { Link } from 'dva/router';
import { Form, Input, Button, Checkbox } from 'antd';
import { Api } from '@/helpers';
import { processMessage } from '@/utils/processMessage';

import styles from "./Login.less";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // Api.post(`/auth/login`, { auth: values }).then(res => {
        //   if (res.success) {
        //     processMessage(res);
        //     localStorage.setItem('accessToken', res.token);
        //     this.props.dispatch({ type: 'accessToken/username', payload: { user: res.user, username: res.user.nikname } });
        //     this.props.dispatch({ type: 'accessToken/fetchCurrentPermission', payload: {} });
        //     this.props.history.push(`${HostLocation()}/home`);
        //   }
        // });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.login}>
        <div className={styles.header}>
          <div className={styles.logo}></div>
        </div>
        <div className={styles.title}>
          欢迎来到快点固定资产管理
        </div>
        <div className={styles.form}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入账号!' }],
              })(
                <Input
                  prefix={''}
                  placeholder="请输入账号"
                />,
              )}
            </Form.Item>
            <Form.Item className={styles.FormItem2}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={''}
                  type="password"
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住密码</Checkbox>)}
              <Link style={{ float: 'right' }} to={'/mobile/forget_password'}>
                <span>忘记密码</span>
              </Link>
            </Form.Item>
            {/* <div className={styles.Checkbox}><Checkbox>记住密码</Checkbox></div> */}
            <Button type="primary" htmlType="submit" className={styles.btnLogin}>
              登录
            </Button>
          </Form>
        </div>
        {/* <div className={styles.footer}>
          <span>忘记密码</span>
          <span>|</span>
          <Link to={'/mobile/forget_password'}>
            <span>找回密码</span>
          </Link>
        </div> */}
      </div>
    );
  }
}
export default connect()(Form.create()(Login));
