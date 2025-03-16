import React from "react";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import useFavoriteStore from "../ZustandStores/useFavoriteStore";
import placeholder from "../assets/images/placeholder.jpg";

export default function Favorites() {
  const { favorites, removeFromFavorites } = useFavoriteStore();
  
  const getImagePath = (img) => {
    const images = import.meta.glob("../assets/images/*", { eager: true });
    return images[`../assets/images/${img}`]?.default || placeholder;
  };

  return (
    <div>
      <h2 className="mb-4">⭐ Mes Favoris</h2>
      
      {favorites.length === 0 ? (
        <Alert variant="info">Aucun élément en favoris</Alert>
      ) : (
        <Row>
          {favorites.map((event) => (
            <Col key={event.id} sm={12} md={6} lg={3}>
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
                  <Button 
                    variant="danger" 
                    onClick={() => removeFromFavorites(event.id)}
                  >
                    Retirer des favoris
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}