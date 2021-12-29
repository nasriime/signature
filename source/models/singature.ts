import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import { v4 as uuidv4 } from 'uuid';
import ISingature from '../interfaces/singature';

const SingatureSchema: Schema = new Schema(
    {
        id: { type: String, default: uuidv4(), required: false },
        label: { type: String, required: true },
        type: { type: String, default: 'RSA', required: true },
        counter: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

SingatureSchema.post<ISingature>('save', function () {
    logging.info('Mongo', 'Checkout the singature we just saved: ', this);
});

export default mongoose.model<ISingature>('Singature', SingatureSchema);
