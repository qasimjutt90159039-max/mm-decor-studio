import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { InMemoryCollection } from './store.js';

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const MongooseAdmin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
const memoryAdmin = new InMemoryCollection('admins');

export const Admin = new Proxy(MongooseAdmin, {
  get(target, prop) {
    if (mongoose.connection?.readyState === 1) {
      return target[prop];
    }
    return memoryAdmin[prop];
  },
});
