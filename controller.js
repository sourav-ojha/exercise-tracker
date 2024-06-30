const { User } = require("./models");

const getUsers = async (req, res) => {
  const data = await User.find();
  res.json(data);
};

const createUser = async (req, res) => {
  if (!req.body.username)
    return res.status(400).json({ message: "Username is required" });

  const data = await User.create({
    username: req.body.username,
  });
  res.json(data);
};

const createExercise = async (req, res) => {
  console.log(req.body);

  if (!req.body.description)
    return res.status(400).json({ message: "Description is required" });
  if (!req.body.duration)
    return res.status(400).json({ message: "Duration is required" });
  if (!req.body.date) req.body.date = new Date();

  const data = await User.findById(req.params._id);
  if (!data) return res.status(400).json({ message: "User not found" });

  const exercise = {
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: new Date(req.body.date).toDateString() || new Date().toDateString(),
  };

  data.excercises.push(exercise);
  const newExercise = await data.save();

  return res.json({
    _id: newExercise._id,
    username: newExercise.username,
    description:
      newExercise.excercises[newExercise.excercises.length - 1].description,
    duration:
      newExercise.excercises[newExercise.excercises.length - 1].duration,
    date: newExercise.excercises[newExercise.excercises.length - 1].date,
  });
};

const getLogs = async (req, res) => {
  // [from][&to][&limit]

  const data = await User.findOne({ _id: req.params._id });
  if (!data) return res.status(400).json({ message: "User not found" });

  const from = req.query.from;
  const to = req.query.to;
  const limit = req.query.limit;
  const query = {};

  if (from) query.date = { $gte: new Date(from) };
  if (to) query.date = { ...query.date, $lte: new Date(to) };
  if (limit) query.limit = parseInt(limit);

  const exercises = data.excercises
    .filter((exercise) => {
      if (from && new Date(exercise.date) < new Date(from)) return false;
      if (to && new Date(exercise.date) > new Date(to)) return false;
      return true;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, query.limit);

  res.json({
    _id: req.params._id,
    username: data.username,
    count: exercises.length,
    log: exercises,
  });
};

module.exports = {
  getUsers,
  createUser,
  createExercise,
  getLogs,
};
