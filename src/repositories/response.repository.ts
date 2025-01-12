import { HydratedDocument } from 'mongoose';
import BaseRepository from './base.repository';
import ResponseModel from '../models/response.model';

export default class ResponseRepository extends BaseRepository<Response> {
  override modelInstance = ResponseModel;

  async create(data: any): Promise<HydratedDocument<any>> {
    return await this.modelInstance.create({ data });
  }
}
