const router = require("express").Router();
const requireAuth = require('../../middleware/requireAuth')

const {
  getAllMemes,
  getSingleMeme,
  createMeme,
  deleteMeme,
  updateMeme,
  addLike,
  removeLike,
  addDislike,
  removeDislike
} = require("../../controllers/meme-controller");

//require auth for all meme routes
router.use(requireAuth)

// Set up routes at /api/memes
router
  .route("/")
  .get(getAllMemes)
  
// /api/memes/:userId
  router
  .route("/:userId")
  .post(createMeme);
  
// /api/memes/:memeId
router
  .route("/:memeId")
  .get(getSingleMeme)
  .put(updateMeme)
 
// /api/memes/:userId/:memeId 
router
  .route("/:userId/:memeId")
  .delete(deleteMeme)

//  /api/memes/:memeId/like
router
  .route("/:memeId/like")  
  .put(addLike);

//  /api/memes/:memeId/like/:likeId
router
  .route("/:memeId/like/:likeId")
  .delete(removeLike);

  //  /api/memes/:memeId/dislike
router
.route("/:memeId/dislike")  
.put(addDislike);

//  /api/memes/:memeId/dislike/:dislikeId
router
.route("/:memeId/dislike/:dislikeId")
.delete(removeDislike);

module.exports = router;
