import { Api, I18n } from '@/helpers';
import Permission from '@/helpers/Permission';
import Immutable from 'immutable'

export default {

  namespace: 'accessToken',

  state: {
    permission: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *username({ payload }, { call, put }) {
      const { user, username } = payload;
      yield put({ type: 'getUsername', user, username });
    },
    *i18n({ payload }, { call, put }) {
      Api.get('/my/i18n', { locale: 'zh-CN' }).then(res => {
        if (res.success) {
          I18n.init(res.results);
        }
      });
    },
  },

  reducers: {
    getUsername(state, action) {
      return { ...state, ...action };
    },
  },
};
