import React from 'react';
import dynamic from 'dva/dynamic';
import { Router, Route, Switch, Redirect } from 'dva/router';
import {
  AccessToken, App, Login, Page404
} from '@/containers';

import 'antd-mobile/dist/antd-mobile.less';
import 'antd/dist/antd.less';

export function HostLocation() {
  return '/mobile/quection';
}

export function PathLocation() {
  return '/mobile';
}

const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => app.model(require(`./models/${m}`).default)),
  component,
});

function RouterConfig({ app, history }) {
  const apps = [
    {
      name: '首页',
      path: `${HostLocation()}/home`,
      models: [],
      component: () => import('./containers/Home'),
    },
    {
      name: '我的',
      path: `${HostLocation()}/mine`,
      models: [],
      component: () => import('./containers/Mine'),
    },
  ];

  return (
    <AccessToken history={history}>
      <Router history={history}>
        <Switch>

          <Redirect exact from="/" to={HostLocation()} />
          <Redirect exact from="/mobile" to={HostLocation()} />
          <Redirect exact from={HostLocation()} to={`${HostLocation()}/home`} />
          <Route path={`/404`} component={Page404} />

          <Route
            path={HostLocation()}
            component={route => (
              <App {...route}>
                <Switch>
                  {
                    apps.map(({ path, models, component }) => (
                      <Route
                        key={path}
                        path={path}
                        exact
                        component={
                          dynamicWrapper(app, models, component)
                        }>
                      </Route>
                    ))
                  }
                  {/* 404 */}
                  <Route path="*" component={() => (<Redirect to="/404" />)}></Route>
                </Switch>
              </App>
            )} />

          {/* <Route path={`${PathLocation()}/login`} component={Login} /> */}

          {/* 404 */}
          <Route path="*" component={() => (<Redirect to="/404" />)} />

        </Switch>
      </Router>
    </AccessToken>
  );
}

export default RouterConfig;
