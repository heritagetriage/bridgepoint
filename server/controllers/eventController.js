const Event = require('../models/Event');
const path = require('path');
const fs = require('fs');

/**
 * Get all events
 * @route GET /api/events
 * @access Public
 */
exports.getEvents = async (req, res) => {
  try {
    const { featured, status, limit = 10, page = 1 } = req.query;
    const query = {};
    
    // Validate pagination parameters
    const parsedLimit = Math.min(Math.max(parseInt(limit), 1), 100);
    const parsedPage = Math.max(parseInt(page), 1);

    // Apply filters if provided
    if (featured) query.featured = featured === 'true';
    if (status) query.status = status;
    
    console.log('Event query:', query);
    console.log('Pagination:', { page: parsedPage, limit: parsedLimit, skip: (parsedPage - 1) * parsedLimit });
    
    // Calculate pagination
    const skip = (parsedPage - 1) * parsedLimit;
    
    // Execute query with pagination
    const events = await Event.find(query)
      .sort({ date: 1 }) // Sort by date ascending (upcoming first)
      .skip(skip)
      .limit(parsedLimit)
      .exec();
    
    console.log(`Found ${events.length} events in database`);
    if (events.length > 0) {
      console.log('Sample event:', JSON.stringify(events[0], null, 2));
    }
    
    // Get total count for pagination
    const total = await Event.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: events.length,
      total,
      page: parsedPage,
      pages: Math.ceil(total / parsedLimit),
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching events',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get a single event by ID
 * @route GET /api/events/:id
 * @access Public
 */
exports.getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if ID is a valid MongoDB ObjectId
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID format'
      });
    }
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Create a new event
 * @route POST /api/events
 * @access Private (Admin only)
 */
exports.createEvent = async (req, res) => {
  try {
    // Add the current user as creator
    req.body.createdBy = req.user.id;
    
    // Temporarily make imageUrl optional
    if (!req.body.imageUrl) {
      req.body.imageUrl = 'https://placehold.co/600x400?text=Event+Image';
    }
    
    // Create the event
    const event = await Event.create(req.body);
    
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Update an event
 * @route PUT /api/events/:id
 * @access Private (Admin only)
 */
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Update the event
    event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Delete an event
 * @route DELETE /api/events/:id
 * @access Private (Admin only)
 */
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    await event.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Upload event image
 * @route POST /api/events/upload
 * @access Private (Admin only)
 */
exports.uploadEventImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '../../public/uploads/events');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Generate filename and move file
    const filename = `event_${Date.now()}${path.extname(req.file.originalname)}`;
    const filePath = path.join(uploadsDir, filename);
    
    fs.writeFileSync(filePath, req.file.buffer);
    
    // Return the file path that can be stored in the database
    const fileUrl = `/uploads/events/${filename}`;
    
    res.status(200).json({
      success: true,
      data: {
        fileName: filename,
        filePath: fileUrl
      }
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
