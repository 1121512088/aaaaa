import { message } from 'antd';

export function processMessage(result, opts = {}) {
  const msg = result.message;
  if(msg == undefined) {
    return false
  }

  if (!window.messages) window.messages = {};

  if (typeof(msg) != 'object') {
    let replace = opts.error && opts.error.replace || opts.replace || true;
    if (replace && window.messages.error) window.messages.error();
    window.messages.error = message.error(msg, 10);
    return;
  }
  switch(msg.type) {
    case 'error':
    case 'wran':
    case 'info':
    case 'success': {
      const fn = message[msg.type];
      let replace = opts[msg.type] && opts[msg.type].replace || opts.replace || true;
      if (replace && window.messages[msg.type]) window.messages[msg.type]();
      window.messages[msg.type] = fn(msg.cnt, msg.duration || 1.5);
      break;
    }
    default: {
      let replace = opts.success && opts.success.replace || opts.replace || true;
      if (replace && window.messages.success) window.messages.success();
      window.messages.success = message.success(msg.cnt || msg, msg.duration || 3);
    }
  }
}
