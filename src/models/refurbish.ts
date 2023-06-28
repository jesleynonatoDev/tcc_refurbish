import mongoose from 'mongoose';

const refurbishSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  refurbishName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const RefurbishModel = mongoose.model('refurbish', refurbishSchema);