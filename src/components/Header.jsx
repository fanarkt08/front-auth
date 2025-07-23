import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router";
import { useState, useEffect } from "react";
import "../assets/styles/Header.css";

const isAuthenticated = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth && new Date(auth.expiresAt) > new Date();
};

function Header() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const location = useLocation();

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, [location]);

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Offres
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Accueil
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/publiques">
            Offres Publiques
          </Nav.Link>

          {loggedIn ? (
            <>
              <Nav.Link as={NavLink} to="/offres/professionnelles">
                Offres Professionnelles
              </Nav.Link>
              <Nav.Link as={NavLink} to="/deconnexion">
                Déconnexion
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/inscription">
                Inscription
              </Nav.Link>
              <Nav.Link as={NavLink} to="/connexion">
                Connexion
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
