let Mock = require('mockjs')
export default {
  'GET /ok': 'ok',
  '/api/users/1': { id: 1 },
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};
