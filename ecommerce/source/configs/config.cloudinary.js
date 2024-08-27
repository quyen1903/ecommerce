'use strict';
const cloudinary = require('cloudinary').v2

// Configuration
cloudinary.config({ 
    cloud_name: 'df5dx9qbk', 
    api_key: '268441966689278', 
    api_secret: process.env.CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary