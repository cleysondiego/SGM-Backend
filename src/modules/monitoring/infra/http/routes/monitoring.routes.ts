import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import MonitoringController from '../controllers/MonitoringController';

const usersRouter = Router();
const monitoringController = new MonitoringController();

usersRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      teacher_id: Joi.string().required().uuid(),
      monitor_id: Joi.string().uuid(),
    },
  }),
  monitoringController.create,
);

export default usersRouter;
