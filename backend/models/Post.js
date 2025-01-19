const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, // Ensures title is mandatory
        trim: true, // Removes extra whitespace
    },
    content: { 
        type: String, 
        required: true, // Ensures content is mandatory
        trim: true,
    },
    images: {
        type: [String], 
        default: [], // Defaults to an empty array if no images are provided
    },
    author: { 
        type: String, 
        required: true, // Ensures author is mandatory
        trim: true, // Removes extra whitespace
    },
    createdAt: { 
        type: Date, 
        default: Date.now, // Automatically sets the current timestamp
    },
});

// Export the model
module.exports = mongoose.model('Post', PostSchema); 