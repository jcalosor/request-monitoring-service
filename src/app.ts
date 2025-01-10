// Import required modules
import Fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import axios from 'axios';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import mongoose, { Schema, model } from 'mongoose';
import {ResponseModel} from "./models/response";
import MongoDbConnection from "./connections/database/mongo-db.connection";

// Initialize application components
export class App {
    public app: FastifyInstance;
    public server: http.Server;
    public io: SocketIOServer;
    public port: number;
    public mongoDbPort: number;

    constructor(port: number, mongoDbPort: number) {
        this.app = Fastify();
        this.server = http.createServer(this.app.server);
        this.io = new SocketIOServer(this.server);
        this.port = port;
        this.mongoDbPort = mongoDbPort;

        this.initializeMiddleware();
        new MongoDbConnection().createConnection(mongoDbPort);
        this.initializeRoutes();
        this.initializeWebSocket();
    }

    private initializeMiddleware(): void {
        this.app.register(fastifyCors);
    }

    // private async initializeDatabase(): Promise<void> {
    //     try {
    //         await mongoose.connect(`mongodb://mongo:${this.mongoDbPort}/httpbinService`, {});
    //         console.log('MongoDB connected');
    //     } catch (err) {
    //         console.error('Database connection error:', err);
    //     }
    // }

    private initializeRoutes(): void {
        this.app.get('/api/history', async (request, reply) => {
            try {
                const data = await ResponseModel.find().sort({ timestamp: -1 });
                reply.send(data);
            } catch (error) {
                if (error instanceof Error) {
                    reply.status(500).send({ error: error.message });
                } else {
                    reply.status(500).send({ error: 'Unknown error occurred' });
                }
            }
        });
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
        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}