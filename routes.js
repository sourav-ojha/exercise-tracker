const router = require("express").Router();
const controller = require("./controller");

router.route("/users").get(controller.getUsers).post(controller.createUser);

router.route("/users/:_id/exercises").post(controller.createExercise);

router.route("/users/:_id/logs").get(controller.getLogs);

module.exports = router;
