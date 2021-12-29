import { Document } from 'mongoose';

export default interface ISingature extends Document {
    id: string;
    label: string;
    type?: 'RSA' | 'ECC';
    couner: number;
}
