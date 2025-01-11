import { Model } from 'mongoose';
import { HistoryResponseEntity } from '../entities/responses/history/history-response.entity';

export default abstract class BaseRepository<T extends object> {
  modelInstance: Model<any> = Model;

  async getAll() {
    const result = await this.modelInstance.find().sort({ timestamp: -1 });

    return result.map((item: any) => ({
      ...item.toObject(),
      data: item.data.json,
    }));
  }

  async getPaginatedList(skip: number, limit: number): Promise<HistoryResponseEntity[]> {
    const result = await this.modelInstance
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ timestamp: -1 });

    return result.map((item: any): HistoryResponseEntity => ({
      ...item.toObject(),
      data: item.data.json,
    }));
  }

  async countResponses(): Promise<number> {
    return this.modelInstance.countDocuments();
  }
}
