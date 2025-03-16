import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import useCounterStore from '../Zustand/counter_store';
import useFavoriteStore from '../ZustandStores/useFavoriteStore';

export default function NavigationBar(){
    const count = useCounterStore(state=>state.count);
    const favoritesCount = useFavoriteStore(state=>state.getFavoritesCount());
    
    const style = {
        textDecoration: "none",
        color: "black"
    }
    const customStyle = {
        textDecoration: "underline",
        color: "red",
        fontWeight: "bold"
    }

    return <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">My Event App , with {count} </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/home"
          style={({isActive})=> (isActive? customStyle: style)}
          >Home</Nav.Link>
          <Nav.Link as={NavLink} to="/events" style={({isActive})=> (isActive? customStyle: style)} >Events</Nav.Link>
          <Nav.Link as={NavLink} to={'/events/add'} style={({isActive})=> (isActive? customStyle: style)}>Add Event</Nav.Link>
          <Nav.Link as={NavLink} to={'/favorites'} style={({isActive})=> (isActive? customStyle: style)}>
            Mes Favoris {favoritesCount > 0 && `(${favoritesCount})`}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}