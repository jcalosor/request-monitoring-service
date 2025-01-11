import { FastifyReply, FastifyRequest } from 'fastify';
import ResponseRepository from '../repositories/response.repository';

export default class HistoryController {
  protected repository: ResponseRepository;

  constructor() {
    this.repository = new ResponseRepository();
  }

  /**
     * Return a paginated result of the stored responses.
     *
     * @param request
     * @param response
     *
     * @return Promise
     */
  async getPaginatedResult(request: FastifyRequest, response: FastifyReply) {
    const { page = 1, limit = 10 } = request.query as { page: number; limit: number };
    const skip = (page - 1) * limit;

    try {
      const total = await this.repository.countResponses();
      const data = await this.repository.getPaginatedList(skip, limit);

      response.header('Content-Type', 'application/json')
        .send({
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          data,
        });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send({ error: error.message });
      } else {
        response.status(500).send({ error: 'Unknown error occurred' });
      }
    }
  }
}
