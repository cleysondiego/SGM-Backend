import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import MonitoringController from '../controllers/MonitoringController';

const usersRouter = Router();
const monitoringController = new MonitoringController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      teacher_id: Joi.string().required(),
      monitor_id: Joi.string(),
    },
  }),
  monitoringController.create,
);

export default usersRouter;
