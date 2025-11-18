import Feedback from "../models/feedBackModel.js";
import User from "../models/userModel.js";

export const addFeedback = async (req, res) => {
  try {
    const {
      foodQuality,
      serviceQuality,
      overallExperience,
      wouldRecommend,
      suggestions,
      followUp,
    } = req.body;

    const feedback = await Feedback.create({
      user: req.user._id,
      foodQuality,
      serviceQuality,
      overallExperience,
      wouldRecommend,
      suggestions,
      followUp,
    });
    await User.findByIdAndUpdate(req.user._id, {
      $push: { feedback: feedback._id },
    });

    res.status(201).json(feedback);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to save feedback" });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const latestFeedback = await Feedback.findOne({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    if (!latestFeedback) {
      return res.status(200).json(null);
    }

    res.json(latestFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get feedback" });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "name email");
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get feedbacks" });
  }
};
