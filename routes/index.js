'use strict';
import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Shopkeep' });
});
/* GET home page. */
router.get('/product/:slug', (req, res) => {
    //will isomorhpic this bad boy at some point, just not today.
  res.render('index', { title: 'Shopkeep' });
});

export default router;
