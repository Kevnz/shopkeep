'use strict';
import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Shopkeep' });
});
/* GET home error. */
router.get('/error', (req, res) => {
  throw new Error('does GA let me do this');
});
export default router;
