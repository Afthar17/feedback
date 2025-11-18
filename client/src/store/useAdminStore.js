import { create } from "zustand";
import axios from "../lib/axios.js";

export const useAdminFeedbackStore = create((set) => ({
  feedbacks: [],
  loading: false,
  error: null,

  fetchAllFeedbacks: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get("/feedback/getfeedbacks");
      set({
        feedbacks: res.data,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to load feedbacks",
      });
    }
  },
}));
