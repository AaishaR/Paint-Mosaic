import { Router } from "express";

const router = Router();

import artController  from './controllers/artwork-controllers';
import userController  from './controllers/user-controller';

router.get('/artwork', artController.getArtwork);
router.post('/artwork', artController.postArtwork);
router.get('/artwork/artist/:name', artController.getArtist);
router.delete('/artwork/:id', artController.deleteArt);

//routes for user authentication and authorisation

router.post('/user/register', userController.postRegister);
router.post('/user/login', userController.postLogin);
router.get('/user/details', userController.getUserDetails);
router.get('/user', userController.getUser);

//updating user profile

router.post('/user/addFav', userController.putAddToFav);
router.post('/user/removeFav', userController.putRemoveFav);

export default router;