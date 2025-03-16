import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStoreStored = create(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
      }),
      {
        name: "zustand-state", // Key to store in localStorage
      }
    )
  );
  
export default useStoreStored;


