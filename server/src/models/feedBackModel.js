import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodQuality: { type: Number, required: true },
    serviceQuality: { type: Number, required: true },
    overallExperience: { type: Number, required: true },
    wouldRecommend: { type: Boolean, required: true },
    suggestions: { type: String, required: true },
    followUp: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
