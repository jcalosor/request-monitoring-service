import { Schema, model } from 'mongoose';

const responseSchema = new Schema({
  data: Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now },
});

const ResponseModel = model('Response', responseSchema);

export default ResponseModel;
