import React, { Suspense, lazy } from 'react';
import { router, dynamic } from 'dva';
import { App, Page404 } from '@/pages';

// import 'antd-mobile/dist/antd-mobile.less';
const { Router, Route, Switch, Redirect } = router;
const rootPath = `/mobile`;

const dynamicWrapper = (app, models, component) => {
  return dynamic({
    app,
    models: () => models.map(m => app.model(require(`./models/${m}`).default)),
    component,
    // component: lazy(() => import(`./pages/${component}`)),
  });
};

export function getPaths() {
  return {
    rootPath,
  };
}

export default function RouterConfig({ app, history }) {
  const pagas = [
    {
      name: '首页',
      path: '/home',
      models: [],
      component: () => import('./pages/Home'),
    },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router history={history}>
        <Switch>
          <Redirect exact from="/" to={rootPath} />
          <Redirect exact from={rootPath} to={`${rootPath}/home`} />
          {/* <Route path={`/404`} component={Page404} /> */}
          <Route
            path={rootPath}
            component={route => (
              <App {...route}>
                <Switch>
                  {
                    pagas.map(({ path, models, component }) => (
                      <Route
                        key={path}
                        path={`${rootPath}${path}`}
                        exact
                        component={
                          dynamicWrapper(app, models, component)
                        }>
                      </Route>
                    ))
                  }
                  {/* 404 */}
                  {/* <Route path="*" component={() => (<Redirect to="/404" />)}></Route> */}
                </Switch>
              </App>
            )} />

          {/* <Route path="*" component={() => (<Redirect to="/404" />)} /> */}
        </Switch>
      </Router>
    </Suspense>
  );
}
