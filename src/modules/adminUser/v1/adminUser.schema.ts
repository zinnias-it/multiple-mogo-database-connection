import { Document, model, Schema } from 'mongoose';

export interface IAdminUser extends Document {
    full_name: string;
    email: string;
    password: string;
    phone_number: string;
    otp: string | null;
}

const AdminUserSchema = new Schema(
    {
        full_name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true, select: false },
        phone_number: { type: String, required: true, unique: true },
        otp: { type: String || null, default: null }
    },
    {
        timestamps: true
    }
);

export default model<IAdminUser>('AdminUser', AdminUserSchema);
