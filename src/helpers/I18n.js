import Immutable from 'immutable';

function fillText(tmpl, dict) {
  tmpl = tmpl || '';
  dict = dict || {};
  const keys = Object.keys(dict);

  keys.map(key => {
    const val = dict[key];
    const reg = RegExp(`%\\{\\s*${key}\\s*\\}`, 'gi');
    tmpl = tmpl.replace(reg, val);
  });

  return tmpl;
}

export default class I18n {
  static i18nData;

  static init(data) {
    localStorage.setItem('i18n', JSON.stringify(data));
    this.i18nData = data;
  }

  static translate(key, options) {
    if((!this.i18nData || this.i18nData.length === 0) && localStorage.getItem('i18n')) {
      let data = Immutable.fromJS(JSON.parse(localStorage.getItem('i18n')));
      this.i18nData = data;
    }
    const realKey = key || '';
    const keys = realKey.split('.');
    // const lKey = this.i18nData && this.i18nData.getIn(keys);
    const lKey = this.i18nData && Immutable.getIn(this.i18nData, keys);
    if(!lKey) {
      if (key.indexOf("null") === -1) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`没有找到翻译内容：'${key}'`);
        }
      }
      return null;
    }
    return fillText(lKey, options);
  }

  static t(key, options) {
    return this.translate(key, options);
  }
}


