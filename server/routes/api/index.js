const router = require('express').Router();
const userRoutes = require('./user-routes');
const memeRoutes = require('./meme-routes');

// adds prefix of `/users` to routes created in `user-routes.js`
router.use('/users', userRoutes);
router.use('/memes', memeRoutes);

module.exports = router;
