import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import monitorRouter from '@modules/users/infra/http/routes/monitor.routes';
import monitoringRouter from '@modules/monitoring/infra/http/routes/monitoring.routes';
import presencesRouter from '@modules/presences/infra/http/routes/presences.routes';
import subjectRouter from '@modules/monitoring/infra/http/routes/subject.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/monitor', monitorRouter);
routes.use('/monitoring', monitoringRouter);
routes.use('/presences', presencesRouter);
routes.use('/subject', subjectRouter);

export default routes;
