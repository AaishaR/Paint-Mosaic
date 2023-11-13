'use strict';

const router = require('express').Router();
const { getArtwork, postArtwork, getArtist, deleteArt } = require('./controllers/artwork-controllers');
const userController = require('./controllers/user-controller');
const authMiddleware = require('./middlewares/auth');

router.get('/artwork', getArtwork);
router.post('/artwork', postArtwork);
router.get('/artwork/artist/:name', getArtist);
router.delete('/artwork/:id', deleteArt);

//routes for user authentication and authorisation

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);

module.exports = router;