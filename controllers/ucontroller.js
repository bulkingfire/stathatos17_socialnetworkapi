const { User, Thought } = require('../models');

module.exports = {
  
  async get1(req, res) {
    try {

      const users = await User.find();
      res.json(users);
    } catch (err) {


      res.status(500).json(err);
    }
  },
  
  async get2(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No ID' });


      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }

  },

  async create1(req, res) {
    try {
      const user = await User.create(req.body);

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async del1(req, res) {
    try {

      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No  ID' });

      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'deleted' });

    } catch (err) {
      res.status(500).json(err);
    }
  },
 
  async update1(req, res) {
    try {
      const user = await User.findOneAndUpdate(

        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No  id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
