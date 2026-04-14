import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    targetType: {
      type: String,
      enum: ['url', 'ip', 'domain'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'scanning', 'completed', 'failed'],
      default: 'pending',
    },
    riskScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    grade: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'F'],
      default: 'F',
    },
    threatLevel: {
      type: String,
      enum: ['Critical', 'High', 'Medium', 'Low', 'Info'],
      default: 'Info',
    },
    vulnCount: {
      type: Number,
      default: 0,
    },
    openPorts: [Number],
    vulnerabilities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vulnerability',
    }],
    scanStartTime: Date,
    scanEndTime: Date,
    duration: Number,
    errorMessage: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Scan || mongoose.model('Scan', scanSchema);
