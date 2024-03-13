const { Router } = require('express');
const router = Router();

const {  renderIndex, apiDate } = require('../controllers/index.controller');

router.get('/', renderIndex);

router.get('/api/:date?', apiDate);

module.exports = router;