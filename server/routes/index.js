const router = require('express').Router();

// Import API and HTML routes   (no need for index.js since it's implied)
const apiRoutes = require('./api');
const htmlRoutes = require ('./html/html-routes')


// add prefix of `/api` to api routes imported from the `api` directory
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);


router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;