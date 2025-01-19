const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const fs = require('fs');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File upload setup (for a single optional image)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Create a new post
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validate inputs
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Process uploaded image (if any)
    const image = req.file ? req.file.path : null;

    // Create and save new post
    const newPost = new Post({ title, content, author, images: image ? [image] : [] });
    const post = await newPost.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
  }
});

// Get a post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch post', error: error.message });
  }
});

// Update a post by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content} = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure the user is the author
    // if (post.author !== author) {
    //   return res.status(403).json({ message: 'You are not authorized to edit this post' });
    // }

    // Update post fields
    post.title = title || post.title;
    post.content = content || post.content;

    // Replace the image if a new one is uploaded
    if (req.file) {
      // Delete the old image file
      if (post.images.length > 0) {
        fs.unlinkSync(post.images[0]);
      }
      post.images = [req.file.path];
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update post', error: error.message });
  }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    // const { author } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure the user is the author
    // if (post.author !== author) {
    //   return res.status(403).json({ message: 'You are not authorized to delete this post' });
    // }

    // Delete the associated image files
    if (post.images.length > 0) {
      post.images.forEach((imagePath) => {
        fs.unlinkSync(imagePath);
      });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete post', error: error.message });
  }
});

module.exports = router;
