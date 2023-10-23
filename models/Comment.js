const mongoose = require("mongoose");

// a schema is a blueprint, that tell Mongoose how to construct data that will be passed into our MongoDB  database. Blueprint acts as a plan, what actually gets built is from the model
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    // submitting a post w/out a title will be invalid
    required: true,
  },

  //update
  //cloundinary url
  image: {
    type: String,
    require: true,
  },
  //cloundinary unique identifier. used when we delete the post, we want to also delete the image from cloundinary
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: { 
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    //mongodb db object ID that we are going to link posts to users
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //ref. the user schema (User.js)
  },
  createdAt: {
    type: Date,
    //auto sets current date&time
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    //auto sets current date&time
    default: Date.now,
  },
});
//taking schema and exporting as a model, assigning the schema we created (PostSchema) to the model we call "Post". Within this model creation. by default we are also specifying which collection we are talking to

// in therory there can also be a 3rd argument to specify collection. In example below, this was left blank, so mongoose will take name of model "Post" and make it plural "Posts" and make that into a collection and drop into DB.
module.exports = mongoose.model("Post", PostSchema);

//model is contruction worker, schema is the blueprint
