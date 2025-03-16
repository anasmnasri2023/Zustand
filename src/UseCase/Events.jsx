//import eventsJson from "../data/events.json";
import React, { useEffect, useState } from "react";
import Event from "./Event";
import Row from "react-bootstrap/Row";
import Alert from 'react-bootstrap/Alert';
import { deleteEvent, getallEvents } from "../services/api";
import useEventStore from "../ZustandStores/useEventStore";

export default function Events() {
    const [showAlert, setShowAlert] = useState(false);
    const [welcomeAlert, setWelcomeAlert] = useState(true);
    //const [events , setEvents] =useState([])
    const {events ,fetchEvents,deleteEventObject} = useEventStore();
    useEffect(() => {
     fetchEvents();
 
    },[]);
    // useEffect(()=>{

    //   const fetchEvents = async ()=>{
    

    //     const listEvents = await getallEvents()
  
    //     setEvents(listEvents.data)
    //     console.log(listEvents)
  
    //   };

    //   fetchEvents();

    // },[])
    useEffect(() => {
setTimeout(()=>{

    setWelcomeAlert(false);

}, 3000)


    },[])


    const showAlertBook =()=>{
        setShowAlert(true);
        setTimeout(()=>{
            setShowAlert(false);
        }, 2000)
     }


         const deleteE  = async(id)=>{
     
           await deleteEvent(id)
          
           deleteEventObject(id)
     
           
         }   
  return (
    <div>
         {welcomeAlert && <Alert  variant="info">
         Welcome to our App EVENT
        </Alert>
       }
     {showAlert && <Alert  variant="info">
          You have booked an event !
        </Alert>
       }
     <Row >
        {events?.map((eventItem, index) => (
          <Event deleteE={deleteE}  key={eventItem.id} event={eventItem}  fnt={showAlertBook}/>
        ))}
      </Row>
    
    </div>
  );
}
