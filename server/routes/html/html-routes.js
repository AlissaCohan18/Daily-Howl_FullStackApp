const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.json('Hello howlers!')
});


module.exports = router;