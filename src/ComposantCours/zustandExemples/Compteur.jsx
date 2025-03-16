import useCounterStore from "../../Zustand/counter_store";

export default function Compteur(){
    const {count,increment, decrement,reset}= useCounterStore();

    return(
        <div>
            <h1>Compteur  avec valeur {count}</h1>
            <button onClick={increment} >Increment</button>
            <button onClick={decrement}>decrement</button>
            <button onClick={reset}>reset</button>
        </div>
    )
}