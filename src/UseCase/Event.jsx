import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { Link, NavLink } from "react-router-dom";
import placeholder from "../assets/images/placeholder.jpg";
import useFavoriteStore from "../ZustandStores/useFavoriteStore";

export default function Event(props) {
  const [event, setEvent] = useState(props.event);
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavoriteStore();
  const isFavorite = isInFavorites(event.id);
  
  const images = import.meta.glob("../assets/images/*", { eager: true });

  const getImagePath = (img) => {
      return event.nbTickets === 0
      ? images["../assets/images/sold_out.png"]?.default || placeholder 
        : images[`../assets/images/${img}`]?.default || placeholder;
  };
  
  const book = () => {
    props.fnt();
    setEvent((e) => ({
      ...e,
      nbTickets: e.nbTickets-1,
      nbParticipants: e.nbParticipants+1
    }));
  };
  
  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(event.id);
    } else {
      addToFavorites(event);
    }
  };
  
  return (
    <Col sm={12} md={6} lg={3}>
      <Card>
        <Card.Img
          variant="top"
          style={{ height: 200 }}
          src={getImagePath(event.img)}
        />
        <Card.Body>
          <Link to={`/events/${event.id}`}>
            <Card.Title>{event.name}</Card.Title>
          </Link>
          <Card.Text>Price : {event.price}</Card.Text>
          <Card.Text>Number of tickets : {event.nbTickets}</Card.Text>
          <Card.Text>Number of participants : {event.nbParticipants}</Card.Text>
          <Button variant="primary" onClick={book} disabled={event.nbTickets===0?true:false}>Book an event</Button>
          <Button variant="danger" onClick={()=>setEvent((e)=>({...e,like:!e.like}))}>{event.like ? "DISLIKE" : "LIKE"}</Button>
          <Button variant="warning" onClick={()=>props.deleteE(event.id)}>delete</Button>
          <Button variant="info" as={NavLink} to={`/events/update/${event.id}`}>update</Button>
          <Button 
            variant={isFavorite ? "secondary" : "success"} 
            onClick={handleFavorite}
          >
            {isFavorite ? "Retirer des Favoris" : "Ajouter aux Favoris"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}