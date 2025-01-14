import * as process from 'node:process';
import Fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import { Server as SocketIOServer } from 'socket.io';
import router from './configs/routes';
import database from './configs/database';
import Pusher from "pusher";
import NotificationService from "./services/NotificationService";

// Initialize application components
export default class App {
  public app: FastifyInstance;

  public io: SocketIOServer;

  public ping: NotificationService;

  public port: number;

  constructor(
      port: number,
      dbPort: number,
      dbSchema: string,
      pingInterval: number
  ) {
    this.app = Fastify({ logger: true });
    this.io = new SocketIOServer(this.app.server);
    this.ping = new NotificationService(pingInterval);

    this.port = port;

    // Initialize database connections
    database(dbPort, dbSchema);

    // Initialize routes
    router(this.app);

    this.initializeMiddleware();
    // this.initializeWebSocket();
  }

  private initializeMiddleware(): void {
    this.app.register(fastifyCors);
  }

  private initializeWebSocket(): void {
    this.io.on('connection', (socket) => {
      console.log('A client connected');

      socket.on('disconnect', () => {
        console.log('A client disconnected');
      });
    });
  }

  public start(): void {
    this.app.listen(
      { port: this.port, host: process.env.APP_HOST },
      (err, address) => {
        if (err) {
          process.exit(1);
        }
        console.log(`Server is running on ${address}`);
      },
    );

    // Initiate the ping service,
    // @todo: this could have been cron job to decouple the load from the api-service
    this.ping.startPinging();
  }
}
