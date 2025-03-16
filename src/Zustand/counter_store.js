import {create} from 'zustand';
const validationMiddleware = (config) => (set, get, api) =>
    config(
      (args) => {
        if (typeof args === "function") {
          const newState = args(get()); 
          if (newState.count !== undefined && newState.count < 0) {
            console.error("Erreur : Le compteur ne peut pas être négatif.");
            return;
          }
          set(args); 
        } else {
          // Cas normal si args est un objet
          if (args.count !== undefined && args.count < 0) {
            console.error("Erreur : Le compteur ne peut pas être négatif.");
            return;
          }
          set(args);
        }
      },
      get,
      api
    );
const useCounterStore = create(
    validationMiddleware (
        (set) => ({
            count:0,
        increment:()=>set((state)=>({count:state.count+1})),
        decrement:()=> set((state)=>({count: state.count-1})),
        reset : ()=> set({count:0})
        })  , {
            name: "zustand_counter"
        }
    )



);

export default useCounterStore;