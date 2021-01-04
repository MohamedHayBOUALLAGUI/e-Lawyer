const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const isAuth = require('../middleware/passport');

const Post = require('../models/Post');
const User = require('../models/User');
const checkObjectId = require('../middleware/checkObjectId');

// @route    POST  /post
// @desc     Create/add a post
// @access   Private
router.post(
  '/',
  [isAuth(), [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log(req)
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        lastName:user.lastName,
        lawyerSpecialty:user.lawyerSpecialty,
        img: user.img,
        user: user.id
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET /post
// @desc     Get all posts
// @access   Private
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET /post/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', [isAuth(),checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE /posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [isAuth(), checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    if(req.user.isAdmin===true)
    {await post.remove();
      res.json({ msg: 'Post removed' });}
    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Lawyer not authorized' });
    }


    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT /posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", [isAuth(), checkObjectId("id")], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );

      await post.save();

      return res.json(post.likes);
    } else if (
      post.dislikes.filter((dislike) => dislike.user.toString() === req.user.id)
        .length > 0
    ) {
      post.dislikes = post.dislikes.filter(
        ({ user }) => user.toString() !== req.user.id
      );

      await post.save();

      return res.json(post.likes);
    } else {
      post.likes.unshift({ user: req.user.id });

      await post.save();

      res.json(post.likes);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT /posts/dislike/:id
// @desc     dislike a post
// @access   Private
router.put(
  "/dislike/:id",
  [isAuth(), checkObjectId("id")],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked/disliked
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        post.likes = post.likes.filter(
          ({ user }) => user.toString() !== req.user.id
        );

        await post.save();

        return res.json(post.dislikes);
      } else if (
        post.dislikes.filter(
          (dislike) => dislike.user.toString() === req.user.id
        ).length > 0
      ) {
        post.dislikes = post.dislikes.filter(
          ({ user }) => user.toString() !== req.user.id
        );

        await post.save();

        return res.json(post.dislikes);
      } else {
        post.dislikes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.dislikes);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST /posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  [
    isAuth(),
    checkObjectId('id'),
    [check('text', 'Text is required').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        lastName:user.lastName,
        lawyerSpecialty:user.lawyerSpecialty,
        img: user.img,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE /posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', isAuth(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    if(req.user.isAdmin===true)
    {  post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);}
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET /post/lawyer/:userName
// @desc     Get post by lawyer name
// @access   Public
router.get('/lawyer/:userName', async (req, res) => {
  try {
    const re = new RegExp(req.params.userName, 'i');
    const post = await Post.find({$or:[{'name':{$regex:re}},{'lastName':{$regex:re}}]});
    
    

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});
// @route    GET /post/lawyerSpecialty/:lawyer
// @desc     Get post by lawyer specialty
// @access   Public
router.get('/lawyerSpecialty/:specialty', async (req, res) => {
  try {
    const re = new RegExp(req.params.specialty, 'i');
    const post = await Post.find({'lawyerSpecialty':{$regex:re}});
    
    

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});
// @route    GET /post/lawyer/:userName
// @desc     Get post by lawyer name
// @access   Public
router.get('/lawyer/:userName/:specialty', async (req, res) => {
  try {
    const re1 = new RegExp(req.params.userName, 'i');
    const re2 = new RegExp(req.params.specialty, 'i');

    const post = await Post.find({$and:[{'lawyerSpecialty':{$regex:re2}},{$or:[{'name':{$regex:re1}},{'lastName':{$regex:re1}}]}]});
    
  res.json(post)
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
