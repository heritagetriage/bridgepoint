require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function resetAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Delete existing admin user
        await User.deleteOne({ username: 'admin' });
        console.log('Deleted existing admin user');

        // Create new admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const newAdmin = new User({
            username: 'admin',
            password: hashedPassword,
            role: 'admin',
            email: 'admin@example.com'
        });

        await newAdmin.save();
        console.log('Created new admin user with password: admin123');

        // Verify the user was created
        const verifyUser = await User.findOne({ username: 'admin' });
        console.log('Verified user:', {
            username: verifyUser.username,
            role: verifyUser.role,
            id: verifyUser._id
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    }
}

resetAdmin();
