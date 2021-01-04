const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const isAuth = require('../middleware/passport');

const Case = require('../models/Case');
const User = require('../models/User');
const checkObjectId = require('../middleware/checkObjectId');

// @route    POST  /case/:lawyer_id
// @desc     Create/add a case
// @access   Private
router.post(
  '/:lawyer_id',
  [isAuth(), [check('description', 'description is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
  
      const user = await User.findById(req.user.id).select('-password');
      const lawyer = await User.findById(req.params.lawyer_id).select('-password');

      const newCase = new Case({
        description: req.body.description,
        lawyerResponses:req.params.lawyer_id,
        userRequests:user.id,
        name_user: user.name + ' '+ user.lastName,
        img_user: user.img,
        name_lawyer: lawyer.name+ ' '+ lawyer.lastName,
        img_lawyer: lawyer.img,

      });
      console.log('params',req.params)
      const caseR = await newCase.save();
      res.json(caseR);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET /case/lawyer
// @desc     Get all posts
// @access   Private
router.get('/lawyer',isAuth(), async (req, res) => {
  try {
    const cases = await Case.find({lawyerResponses:req.user}).sort({ date: -1 });
    res.json(cases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET /case/user
// @desc     Get all cases
// @access   Private
router.get('/user',isAuth(), async (req, res) => {
  try {
    const cases = await Case.find({userRequests:req.user}).sort({ date: -1 });
    res.json(cases);
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

// @route    DELETE /case/:id
// @desc     Delete a case
// @access   Private
router.delete('/:id', [isAuth(), checkObjectId('id')], async (req, res) => {
  try {
    const caseDel = await Case.findById(req.params.id);

    if (!caseDel) {
      return res.status(404).json({ msg: 'Case not found' });
    }
    // Check user
   
    await caseDel.remove();
    res.json({ msg: 'Case removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT /posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', [isAuth(), checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.filter(like => like.user.toString() === req.user.id).length>0) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    PUT /posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', [isAuth(), checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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
        name: user.name + ' '+ user.lastName,
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

//@method PATCH
//@desc accept case
// @PATH  http://localhost:5000/case/accepted/:case_id
// params:id
router.patch("/accepted/:id",isAuth(), async (req, res) => {
  try {
      const caseA = await Case.findOneAndUpdate({_id: req.params.id }, { isAccepted:true });

    res.json({ caseA,msg: "Case Accepted by lawyer !" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;