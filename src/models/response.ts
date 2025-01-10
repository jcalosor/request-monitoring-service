import mongoose, { Schema, model } from 'mongoose';


const responseSchema = new Schema({
    data: Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now },
});

export const ResponseModel = model('Response', responseSchema);