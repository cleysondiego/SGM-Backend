import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SubjectController from '../controllers/SubjectController';

const subjectRouter = Router();
const subjectController = new SubjectController();
const upload = multer(uploadConfig.multer);

subjectRouter.use(ensureAuthenticated);

subjectRouter.get('/', subjectController.index);

subjectRouter.get('/:monitoring_id', subjectController.show);

subjectRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      monitoring_id: Joi.string().uuid().required(),
      url: Joi.string().required(),
    },
  }),
  subjectController.create,
);

subjectRouter.patch(
  '/:monitoring_id/:title',
  upload.single('subjects'),
  subjectController.update,
);

export default subjectRouter;
