const router = require("express").Router();

let Exercise = require("../models/exercise.model");

//End point that get http GET request. localhost:5000/exercises/
router.route("/").get((req, res) => {
  Exercise.find() // mongoose method - get a list of all the uers from database
    //find method returns a promise in json format
    .then(exercises => res.json(exercises)) // then get all the users in users variable and put it to response
    .catch(err => res.status(400).json("Error: " + err)); // if error.catch then response with error
});

// 2nd endpoint. http post request. localhost:5000/exercises/add
router.route("/add").post((req, res) => {
  const username = req.body.username; // new username
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  // new instance of exercise model
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  }); // new instance of User model

  newExercise
    .save() // new user is saved in database
    .then(() => res.json("Exercise Added.")) // returned then give json response
    .catch(err => res.status(400).json("Error: " + err)); // else error
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error" + err));
});

router.route("/delete/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted"))
    .catch(err => res.status(400).json("Error" + err));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise Updated"))
        .catch(err => res.status(400).json("Error" + err));
    })
    .catch(err => res.status(400).json("Error" + err));
});

module.exports = router;
