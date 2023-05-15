const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
  async ideas(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtObj = {
        thoughts,
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getideas(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "incorrect id" });
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async makeideas(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async delidea(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "DNE" });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "no user",
        });
      }

      res.json({ message: "deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addcom(req, res) {
    console.log("added comment");
    console.log(req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "no id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async delcom(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "no id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async idea2(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "no id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
