import { Server as SocketIOServer } from 'socket.io';
import {PayloadGenerator} from './payloadGenerator';
import {ResponseModel} from "../models/response";
import axios from "axios";

export class PingService {
    private io: SocketIOServer;

    constructor(io: SocketIOServer) {
        this.io = io;
        this.startPinging();
    }

    private async pingHttpBin(): Promise<void> {
        try {
            const payload = PayloadGenerator.generate();
            const response = await axios.post('https://httpbin.org/anything', payload);
            const responseData = response.data;

            // Save response data to the database
            const newResponse = new ResponseModel({ data: responseData });
            await newResponse.save();

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

    private startPinging(): void {
        setInterval(() => this.pingHttpBin(), 5 * 60 * 1000);
    }
}