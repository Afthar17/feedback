// src/store/useFeedbackStore.js
import { create } from "zustand";
import axios from "../lib/axios.js";

const initialFeedback = {
  foodQuality: 0,
  serviceQuality: 0,
  overallExperience: 0,
  wouldRecommend: null,
  suggestions: "",
  followUp: false,
};

export const useFeedbackStore = create((set, get) => ({
  feedback: initialFeedback,
  loading: false,
  error: null,
  success: false,

  setField: (key, value) =>
    set((state) => ({
      feedback: {
        ...state.feedback,
        [key]: value,
      },
      success: false,
    })),

  setFeedback: (data) =>
    set(() => ({
      feedback: {
        ...initialFeedback,
        ...data,
      },
      success: false,
    })),

  resetFeedback: () =>
    set(() => ({
      feedback: initialFeedback,
      error: null,
      success: false,
    })),

  // GET /api/feedback/getfeedbacks/latest
  fetchLatestFeedback: async () => {
    set({ loading: true, error: null, success: false });

    try {
      const res = await axios.get("/feedback/getfeedbacks/latest");
      const data = res.data;

      if (!data) {
        set({ feedback: initialFeedback, loading: false });
        return;
      }

      set({
        feedback: {
          foodQuality: data.foodQuality ?? 0,
          serviceQuality: data.serviceQuality ?? 0,
          overallExperience: data.overallExperience ?? 0,
          wouldRecommend:
            typeof data.wouldRecommend === "boolean"
              ? data.wouldRecommend
              : null,
          suggestions: data.suggestions ?? "",
          followUp: !!data.followUp,
        },
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error(err);
      set({
        loading: false,
        error:
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch feedback",
      });
    }
  },

  // POST /api/feedback/addfeedbacks
  submitFeedback: async () => {
    const { feedback } = get();

    if (feedback.wouldRecommend === null) {
      return set({ error: "Please choose Yes or No" });
    }

    set({ loading: true, error: null, success: false });

    try {
      const res = await axios.post("/feedback/addfeedbacks", feedback);
      const data = res.data;

      set({
        feedback: {
          foodQuality: data.foodQuality,
          serviceQuality: data.serviceQuality,
          overallExperience: data.overallExperience,
          wouldRecommend: data.wouldRecommend,
          suggestions: data.suggestions,
          followUp: data.followUp,
        },
        loading: false,
        error: null,
        success: true,
      });
    } catch (err) {
      console.error(err);
      set({
        loading: false,
        error:
          err.response?.data?.message ||
          err.message ||
          "Failed to submit feedback",
        success: false,
      });
    }
  },
}));
