import { HistoryDataResponseEntity } from './history-data-response.entity';

export interface HistoryResponseEntity {
    _id: string;
    data: HistoryDataResponseEntity;
    timestamp: string;
}
