import events from "../data/events.json";
import { useParams } from "react-router-dom";
import useEventStore from "../ZustandStores/useEventStore";
export default function EventDetails() {
    const {name} = useParams();
    console.log(name)
 // const e = events.find(e => e.name === name)
  const events = useEventStore((state)=> state.events);
  const Item = events.find(e=> e.id === name);

    return <div>

{Item ? <p>Le nom de l'évenement {Item.name}</p> : <p>Not found</p>}

    </div>
}