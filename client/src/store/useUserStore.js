import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  signUp: async (data) => {
    set({ Loading: true });
    if (data.password !== data.confirmPassword) {
      set({ Loading: false });
      return toast.error("Passwords do not match");
    }
    const { name, email, password } = data;
    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      return toast.error(error.response.data.message || "Something went wrong");
    }
  },
  login: async (data) => {
    set({ Loading: true });
    const { email, password } = data;
    try {
      const response = await axios.post("/auth/login", { email, password });
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      return toast.error(error.response.data.message || "Something went wrong");
    }
  },
  checkAuth: async () => {
    try {
      set({ checkingAuth: true });

      const response = await axios.get("/auth/authcheck");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      return toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  },

  logOut: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null, checkingAuth: false });
    } catch (error) {
      return toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  },
}));
