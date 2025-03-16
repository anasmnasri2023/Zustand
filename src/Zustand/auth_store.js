import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null, // Null = pas d'utilisateur connecté
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
