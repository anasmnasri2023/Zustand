import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      
      // Ajouter un événement aux favoris
      addToFavorites: (event) => {
        const { favorites } = get();
        // Vérifier si l'événement existe déjà dans les favoris
        if (!favorites.some(fav => fav.id === event.id)) {
          set({ favorites: [...favorites, event] });
          return true; // Succès
        }
        return false; // Déjà dans les favoris
      },
      
      // Supprimer un événement des favoris
      removeFromFavorites: (eventId) => {
        set((state) => ({
          favorites: state.favorites.filter(event => event.id !== eventId)
        }));
      },
      
      // Vérifier si un événement est dans les favoris
      isInFavorites: (eventId) => {
        const { favorites } = get();
        return favorites.some(event => event.id === eventId);
      },
      
      // Obtenir le nombre de favoris
      getFavoritesCount: () => {
        return get().favorites.length;
      },
      
      // Vider tous les favoris
      clearFavorites: () => {
        set({ favorites: [] });
      }
    }),
    {
      name: "favorites-storage", // Nom dans le localStorage
      getStorage: () => localStorage,
    }
  )
);

export default useFavoriteStore;