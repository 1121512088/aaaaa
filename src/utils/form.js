export function toQueryString(obj, urlEncode, getArrWay) {
  function flattenObj(x, path) {
    const result = [];

    path = path || [];
    if (x === null || x === undefined) return;
    Object.keys(x).forEach((key) => {
      if (!x.hasOwnProperty(key)) {
        return;
      }

      const newPath = path.slice();
      newPath.push(key);

      let vals = [];
      if (x[key] === null || x[key] === undefined) {
        vals = [];
      } else if (typeof x[key] === 'object') {
        vals = flattenObj(x[key], newPath);
      } else {
        vals.push({ path: newPath, val: x[key] });
      }
      vals.forEach((obj) => {
        return result.push(obj);
      });
    });

    return result;
  } // flattenObj

  // start with  flattening `obj`
  let parts = flattenObj(obj); // [ { path: [ ...parts ], val: ... }, ... ]

  // convert to array notation:
  parts = parts.map((varInfo) => {
    if (varInfo.path.length === 1) {
      varInfo.path = varInfo.path[0];
    }
    else {
      const first = varInfo.path[0];
      const rest = varInfo.path.slice(1);
      if (getArrWay && !isNaN(Number(rest.slice(rest.length - 1)[0]))) {
        let str = rest.slice(0, rest.length - 1);
        varInfo.path = first + `[${str}][]`;
      } else {
        varInfo.path = first + '[' + rest.join('][') + ']';
      }
    }
    return varInfo;
  }); // parts.map

  // join the parts to a query-string url-component
  const queryString = parts.map(function (varInfo) {
    return varInfo.path + '=' + encodeURIComponent(varInfo.val);
  }).join('&');
  if (urlEncode) {
    return encodeURIComponent(queryString);
  } else {
    return queryString;
  }
}

export function objectFormData(obj) {
  const fd = new FormData();
  let callBack = (obj, keyName) => {
    let key = Object.keys(obj);
    if (key.length === 0) return;
    if (keyName) {
      Object.entries(obj).forEach((item) => {
        if (item[1] instanceof Array) {
          item[1].forEach(v => {
            if (Object.prototype.toString.call(v) === '[object Object]') {
              callBack(v, `${keyName}[${item[0]}][]`);
            } else {
              if (v || v === 0) {
                fd.append(`${keyName}[${item[0]}][]`, v);
              }
            }
          });
        } else if (Object.prototype.toString.call(item[1]) === '[object Object]') {
          callBack(item[1], `${keyName}[${item[0]}]`);
        } else {
          if (item[1] || item[1] === 0) {
            fd.append(`${keyName}[${item[0]}]`, item[1]);
          }
        }
      });
    } else {
      Object.entries(obj).forEach((item) => {
        if (item[1] instanceof Array) {
          item[1].forEach(v => {
            if (Object.prototype.toString.call(v) === '[object Object]') {
              callBack(v, `${item[0]}[]`);
            } else {
              if (v || v === 0) {
                fd.append(`${item[0]}[]`, v);
              }
            }
          });
        } else if (Object.prototype.toString.call(item[1]) === '[object Object]') {
          callBack(item[1], item[0]);
        } else {
          fd.append(item[0], item[1]);
        }
      });
    }
  };
  callBack(obj);
  return fd;
};
