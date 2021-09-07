import config from '../config';
import { toQueryString, objectFormData } from '../utils/form';
import { processMessage } from '@/utils/processMessage';

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  let host = config.getHostFullApiUrl();
  return host + adjustedPath;
}

export function callApi(url, settings = {}) {
  const fetchInit = {};

  fetchInit['method'] = settings.method && settings.method.toUpperCase() || 'GET';
  const promptBol = settings.data != null ? settings.data.prompt || false : false

  fetchInit['formdata'] = settings.formdata;
  if (settings.formdata && fetchInit['formdata'] && fetchInit['method'] !== 'GET') {
    let obj = objectFormData(settings.data);
    fetchInit['body'] = obj;
  } else {
    if (settings.data && fetchInit['method'] != 'GET') {
      fetchInit['body'] = JSON.stringify(settings.data);
    }
  }

  const accessToken = getAccessToken();
  let finalFetchInit = fetchInit;

  let finalUrl = formatUrl(url);
  if (settings.data && fetchInit['method'] == 'GET') {
    let queryStr = null;
    if (settings['array']) {
      queryStr = toQueryString(settings.data, null, settings['array']);
    } else {
      queryStr = toQueryString(settings.data);
    }
    let s = /\?/i.test(finalUrl) ? '&' : '?';
    if (!/^\s*$/.test(queryStr)) finalUrl = `${finalUrl}${s}${queryStr}`;
  }

  let myHeaders = new Headers();

  myHeaders.append('Authorization', `${config.authPrefix} ${accessToken}`);
  if (fetchInit['formdata']) {
  } else {
    myHeaders.append('Content-Type', 'application/json');
  }
  myHeaders.append('X-App-Key', config.appConfig.apiKey);
  myHeaders.append('X-Version-Type', config.appConfig.type);

  finalFetchInit = { ...fetchInit, headers: myHeaders, credentials: 'same-origin' };
  return fetch(finalUrl, finalFetchInit).then(
    (res) => {
      if (res.ok) {
        return res.json().then(
          (data) => {
            if (data.success === false) {
              // return Promise.reject(data);
              return data;
            }
            if (promptBol) {
              processMessage(data); 
            }
            return data;
          }
        );
      } else {
        console.log('response status is not ok:', new Error(res.statusText));
        return res.json().then(
          (data) => {
            if (res.status === 401) {
              processMessage({ message: data.message });
              return { ...data, statusCode: res.status };
            }

            if (res.status === 422) {
              if (data.errors && data.errors.code && data.errors.code.errors instanceof Array && data.errors.code.errors[0]) {
                processMessage({ message: { cnt: data.errors.code.errors[0], type: 'error' } });
              }
              return { ...data, statusCode: res.status };
            }

            return Promise.reject(data);
          }
        );
      }
    },
    (error) => {
      const errorMsg = `请求失败：${error}`;
      console.log(errorMsg);
      return Promise.reject(errorMsg);
    }
  );
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

// formdata
function formdata(url, params, method = 'POST') {
  return callApi(url, { method: method, data: params, formdata: true });
}
// Copy get 数组发送方式 []=1
function getArrWay(url, params) {
  return callApi(url, { method: 'GET', data: params, array: true });
}

function get(url, params) {
  return callApi(url, { method: 'GET', data: params });
}

function post(url, params) {
  return callApi(url, { method: 'POST', data: params });
}

function put(url, params) {
  return callApi(url, { method: 'PUT', data: params });
}

function del(url) {
  return callApi(url, { method: 'DELETE' });
}

export default class ApiClient {
  static formdata = formdata;
  static getArrWay = getArrWay;
  static get = get;
  static post = post;
  static put = put;
  static delete = del;
}
