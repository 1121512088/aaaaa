const environment = {
  development: {
    isProduction: false,
    protocol: 'http',
    host: 'questionnaire.zanzungo.com:8000',
    authPrefix: 'questionnaire',
  },
  production: {
    isProduction: false,
    host: 'questionnaire.zanzungo.com:8000',
    protocol: 'http',
    authPrefix: 'questionnaire',
  },
  staging: {
    isProduction: true,
    host: 'questionnaire.zanzungo.com:8000',
    protocol: 'http',
    authPrefix: 'questionnaire',
  },
}[process.env.BABEL_ENV || process.env.NODE_ENV || 'development'];

const getHostFullUrl = () => {
  let host = '';

  if (config.protocol) {
    if (config.apiPort === "80") {
      host = config.protocol + '://' + config.apiHost;
    } else {
      host = config.protocol + '://' + config.apiHost + ':' + config.apiPort;
    }
  }
  return host + '/v1';
};
// 图片路径
export const getImageUrl = () => {
  let host = '';

  if (config.protocol) {
    if (config.apiPort === "80") {
      host = config.protocol + '://' + config.apiHost;
    } else {
      host = config.protocol + '://' + config.apiHost + ':' + config.apiPort;
    }
  }
  return host;
};

const config = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || '3000',
  apiHost: process.env.APIHOST || environment.host, // 保证API域名和主域名是二级域名关系, 要通过nginx 做反向代理。
  apiPort: process.env.APIPORT || '80', // 端口要来和主端口一致, 要通过nginx 做反向代理
  apiHostProduction: process.env.APIHOST || environment.host, // 保证API域名和主域名是二级域名关系, 要通过nginx 做反向代理。
  apiPortProduction: process.env.APIPORT || '80', // 端口要来和主端口一致, 要通过nginx 做反向代理
  getHostFullApiUrl: getHostFullUrl,
  getImageUrl,
  authPrefix: environment.authPrefix,
  protocol: environment.protocol,
  app: {
    title: '温职专德育平台',
    description: '温职专德育平台',
    copyright: '网站版权所有',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': '温职专德育平台',
        'og:image': 'https://dn-agi-public3.qbox.me/20170222222751/agideo-logo.png',
        'og:locale': 'en_US',
        'og:title': '温职专德育平台',
        'og:description': '温职专德育平台',
      },
    },
  },
  appConfig: {
    type: 'Admin',
    apiKey: 'xxxxxxxxxxxxxxx',
  },
  cookies: {
    login_token_key: '_baseproject_login_token',
    domain: 'docker.cc',
    user_login_token_field: 'login_token',
  },
  login: {
    title: '登录',
  },
};

export default config;
