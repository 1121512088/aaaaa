import Immutable from 'immutable';

export default class Permission {
  static permissionData;

  static init(data) {
    localStorage.setItem('permissions', JSON.stringify(data));
    this.permissionData = data;
  }

  static can(name) {
    if ((!this.permissionData || this.permissionData.length === 0) && localStorage.getItem('permissions')) {
      let data = Immutable.fromJS(JSON.parse(localStorage.getItem('permissions')));
      this.permissionData = data;
    }
    const keys = name.split('-');
    keys.push('show');
    return this.permissionData && this.permissionData.getIn(keys);
  }

  static callCan(name, fn, other) {
    if ((!this.permissionData || this.permissionData.length === 0) && localStorage.getItem('permissions')) {
      let data = Immutable.fromJS(JSON.parse(localStorage.getItem('permissions')));
      this.permissionData = data;
    }
    const keys = name.split('-');
    keys.push('show');

    if (other) {
      alert('暂无权限');
    }

    if (this.permissionData && this.permissionData.getIn(keys)) {
      if (fn) {
        return typeof fn === 'function' ? fn : null;
      }
      return this.permissionData.getIn(keys);
    } else {
      if (fn) {
        return null;
      }
      return false;
    }
  }
}
