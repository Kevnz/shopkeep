'use strict';
import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

export default router;
