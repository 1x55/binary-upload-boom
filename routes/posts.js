const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// tells us to go to postsController, .getPost is the method, again we are requiring postsControler up top, and tells us to go to the /controllers folder
router.get("/:id", ensureAuth, postsController.getPost);
//multer helps facilitate image upload so that it can be put onto cloudinary.
router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
