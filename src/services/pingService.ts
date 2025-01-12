import { Server as SocketIOServer } from 'socket.io';
import axios from 'axios';
import PayloadGenerator from './payloadGenerator';
import ResponseRepository from '../repositories/response.repository';

export default class PingService {
  private io: SocketIOServer;

  private readonly pingInterval: number;

  constructor(io: SocketIOServer, pingInterval: number) {
    this.io = io;
    this.pingInterval = pingInterval;
  }

  private async pingHttpBin(): Promise<void> {
    try {
      const payload = PayloadGenerator.generate();
      const response = await axios.post('https://httpbin.org/anything', payload);
      const responseData = response.data;

      const createResponse = new ResponseRepository().create(responseData);
      await createResponse;

      // Broadcast the new data to connected clients
      this.io.emit('newData', responseData);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error pinging httpbin:', error.message);
      } else {
        console.error('httpbin: Unknown error occurred');
      }
    }
  }

  startPinging(): void {
    setInterval(() => this.pingHttpBin(), this.pingInterval * 60 * 1000);
  }
}
