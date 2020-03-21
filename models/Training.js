const mongoose = require("mongoose");

const TrainingShema = new mongoose.Schema({
  name: {
    type: String,
    default: "New Training",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  },
  exercise: [
    {
      exerciseName: {
        type: String,
        default: "New Exercise"
      },
      series: [
        {
          reps: {
            type: Number
          },
          weight: {
            type: Number
          }
        }
      ]
    }
  ]
});

module.exports = Training = mongoose.model("training", TrainingShema);
