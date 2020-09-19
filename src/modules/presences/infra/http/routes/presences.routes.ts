import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PresencesController from '../controllers/PresencesController';

const presencesRouter = Router();
const presencesController = new PresencesController();

presencesRouter.use(ensureAuthenticated);

presencesRouter.get('/:monitoring_id', presencesController.index);

presencesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      student_registration: Joi.string().required(),
    },
  }),
  presencesController.create,
);

export default presencesRouter;
