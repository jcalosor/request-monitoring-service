import { FastifyInstance } from 'fastify';
import HistoryController from '../controllers/history.controller';
import ResponseRepository from '../repositories/response.repository';

/**
 * Route abstraction & definitions with logic initialization.
 *
 * @param app
 */
const router: any = (app: FastifyInstance) => {
  app.register((server, _, done) => {
    server.get('/health-check', async (request, reply) => {
      reply.send({ message: 'Server is running' });
    });

    // History endpoints definitions.
    server.get('/api/history', async (request, reply) => {
      const controller = new HistoryController();

      await controller.getPaginatedResult(request, reply);
    });

    done();
  }, { prefix: '/v1' });
};

export default router;
