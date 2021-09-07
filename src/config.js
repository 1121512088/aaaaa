const environment = {
  development: {
    protocol: 'http',
    host: '',
    authPrefix: 'Token'
  },
  production: {
    protocol: 'http',
    host: '',
    authPrefix: 'Token',
  },
  testServer: {
    protocol: 'http',
    host: '',
    authPrefix: 'Token',
  },
}[process.env.MAIN_ENV || process.env.NODE_ENV || 'development'];

const getHostApi = () => {
  return `${environment.protocol}://${environment.host}/v1`;
};

const getHostUrl = () => {
  return `${environment.protocol}://${environment.host}`;
};

const getWebscoketHost = () => {
  return `ws://${environment.host || window.location.host}`;
}

const config = {
  ...environment,
  getHostApi: getHostApi(),
  getHostUrl: getHostUrl(),
  getWebscoketHost: getWebscoketHost(),
};

module.exports = config;
