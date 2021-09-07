// import React from 'react';
// import dynamic from 'dva/dynamic';
// import { Router, Route, Switch, Redirect } from 'dva/router';
// import {
//   Home
// } from '@/containers';

// import 'antd-mobile/dist/antd-mobile.less';

// export function HostLocation() {
//   return '/mobile/quection';
// }

// export function PathLocation() {
//   return '/mobile';
// }

// const dynamicWrapper = (app, models, component) => dynamic({
//   app,
//   models: () => models.map(m => app.model(require(`./models/${m}`).default)),
//   component,
// });

// export default function RouterConfig({ app, history }) {
//   const apps = [
//     {
//       name: '首页',
//       path: `${HostLocation()}/home`,
//       models: [],
//       component: () => import('./containers/Home'),
//     },
//   ];

//   return (
//     <Router history={history}>
//       <Switch>
//         <Redirect exact from="/" to={HostLocation()} />
//         <Redirect exact from="/mobile" to={HostLocation()} />
//         <Redirect exact from={HostLocation()} to={`${HostLocation()}/home`} />
//         <Route path={`/404`} component={Page404} />

//         <Route
//           path={HostLocation()}
//           component={route => (
//             <App {...route}>
//               <Switch>
//                 {
//                   apps.map(({ path, models, component }) => (
//                     <Route
//                       key={path}
//                       path={path}
//                       exact
//                       component={
//                         dynamicWrapper(app, models, component)
//                       }>
//                     </Route>
//                   ))
//                 }
//                 {/* 404 */}
//                 <Route path="*" component={() => (<Redirect to="/404" />)}></Route>
//               </Switch>
//             </App>
//           )} />
//         {/* 404 */}
//         <Route path="*" component={() => (<Redirect to="/404" />)} />

//       </Switch>
//     </Router>
//   );
// }
export default () => {
  return "123"
}