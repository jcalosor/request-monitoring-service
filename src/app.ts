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

  public pusher: Pusher;

  constructor(
      pusher: Pusher,
      port: number,
      dbPort: number,
      dbSchema: string,
      pingInterval: number
  ) {
    this.app = Fastify({ logger: true });
    this.pusher = pusher;
    this.port = port;

    this.io = new SocketIOServer(this.app.server, {
      cors: {
        origin: "*",
        methods: "*",
        allowedHeaders: ["Content-Type", "Authorization"],
      }
    });

    // Initialize database connections
    database(dbPort, dbSchema);

    // Initialize routes
    this.initializeMiddleware();
    this.initializeWebSocket();

    router(this.app);
    this.ping = new NotificationService(this.io, pingInterval);

  }

  private initializeMiddleware(): void {
    this.app.register(require("@fastify/cors"),
        {
          origin: "*",
          methods: "*",
          allowedHeaders: ["Content-Type", "Authorization"],
        }
      );
  }

  private initializeWebSocket(): void {
    this.app.decorate("socket", this.io);

    this.io.on('connection', (socket) => {
      console.log('A client connected!');
      console.log(socket.data);



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
          console.error(err);
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
