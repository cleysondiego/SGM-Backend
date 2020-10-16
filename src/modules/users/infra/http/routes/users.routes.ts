import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      user_type: Joi.number().required().min(1).max(4),
    },
  }),
  usersController.create,
);

usersRouter.use(ensureAuthenticated);

usersRouter.get('/:user_type', usersController.index);

usersRouter.get('/', usersController.index);

usersRouter.get('/user/:user_id', usersController.show);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
