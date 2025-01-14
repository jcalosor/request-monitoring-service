import axios from 'axios';
import PayloadGenerator from './PayloadGenerator';
import ResponseRepository from '../repositories/response.repository';
import Pusher from "pusher";
import notificationConfig from "../configs/notification";

export default class NotificationService {

  private pusher: Pusher;

  private readonly pingInterval: number;

  private config;

  constructor(pingInterval: number) {
    this.config = notificationConfig;

    // @ts-ignore
    this.pusher = new Pusher(this.config);
    this.pingInterval = pingInterval;

  }

  private async sendNotification(): Promise<void> {
    try {
      const payload = PayloadGenerator.generate();
      const response = await axios.post('https://httpbin.org/anything', payload);
      const responseData = response.data;

      const createResponse = new ResponseRepository().create(responseData);
      await createResponse;


      // Broadcast the new data to connected clients
      await this.pusher.trigger(this.config.channel || 'tae', this.config.event || 'tae', responseData)
          .then(function(result){
            // For debug purpose.
          });

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error pinging httpbin:', error.message);
      } else {
        console.error('httpbin: Unknown error occurred');
      }
    }
  }

  startPinging(): void {
    setInterval(() => this.sendNotification(), this.pingInterval * 60 * 100);
  }
}
