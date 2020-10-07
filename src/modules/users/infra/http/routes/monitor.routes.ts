import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import MonitorController from '../controllers/MonitorController';

const monitorRouter = Router();

const monitorController = new MonitorController();

monitorRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      monitoring_id: Joi.string().required().uuid(),
      name: Joi.string().required(),
      zip_code: Joi.string().required(),
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      hours_available: Joi.string().required(),
      agency: Joi.string().required(),
      account: Joi.string().required(),
    },
  }),
  monitorController.create,
);

export default monitorRouter;
