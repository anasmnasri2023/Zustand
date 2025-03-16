import { create } from "zustand";
import useAuthStore from "./auth_store"; // Import du store d'authentification

const useCartStore = create((set, get) => ({
  items: [],
  
  addItem: (item) => {
    const user = useAuthStore.getState().user; 
    if (!user) {
      console.error("Vous devez être connecté pour ajouter un article au panier !");
      return;
    }
    set((state) => ({ items: [...state.items, item] }));
  },

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  clearCart: () => set({ items: [] }),
}));

export default useCartStore;



