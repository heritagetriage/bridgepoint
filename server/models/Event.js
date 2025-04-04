const mongoose = require('mongoose');

/**
 * Event Schema
 * Represents an event with title, description, date, location, image, etc.
 */
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true
    },
    date: {
      type: Date,
      required: [true, 'Event date is required']
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true
    },
    imageUrl: {
      type: String,
      required: [true, 'Event image is required']
    },
    featured: {
      type: Boolean,
      default: false
    },
    registrationLink: {
      type: String,
      trim: true
    },
    registrationRequired: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

// Create indexes for better query performance
eventSchema.index({ date: 1 });
eventSchema.index({ featured: 1 });
eventSchema.index({ status: 1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
