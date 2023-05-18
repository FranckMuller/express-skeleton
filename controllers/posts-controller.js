const Post = require("../models/Post");

const getPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(204).json({ message: "no posts found" });
  res.json({ posts });
};

const createNewPost = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "title and description are required" });
  }
  try {
    const result = await Post.create({
      title,
      description,
    });
    res.status(200).json({ meassage: "post have been created" });
  } catch (err) {
    console.error(err);
  }
};

const updatePost = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  const post = await Post.findOne({ _id: req.body.id }).exec();
  if (!post) {
    return res
      .status(204)
      .json({ message: `No post matches ID ${req.body.id}` });
  }

  if (req.body?.title) post.title = req.body.title;
  if (req.body?.description) post.description = req.body.description;
  const result = await post.save();
  res.json({ result });
};

const deletePost = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }
  const post = await Post.findOne({ _id: req.body.id }).exec();
  if (!post) {
    return res
      .status(204)
      .json({ message: `No post matches ID ${req.body.id}` });
  }

  const result = await Post.deleteOne({ _id: req.body.id });
  res.json({ result });
};

const getPost = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "post ID is required" });
  }
  const post = await Post.findOne({ _id: req.params.id }).exec();
  if(!post) {
    return res.status(204).json({message: `no post matches ID ${req.params.id}`})
  }
  res.json(post)
};

module.exports = {
  getPosts,
  createNewPost,
  updatePost,
  deletePost,
  getPost
};
