import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
  const { token, expiresAt } = useSelector((state) => state.auth);
  const isLoggedIn = token && new Date(expiresAt) > new Date();

  return (
    <Navbar bg="light">
      <Container>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Accueil</Nav.Link>
          <Nav.Link as={NavLink} to="/offres/publiques">Offres Publiques</Nav.Link>
          {isLoggedIn && (
            <Nav.Link as={NavLink} to="/offres/professionnelles">
              Offres Professionnelles
            </Nav.Link>
          )}
          {!isLoggedIn && (
            <>
              <Nav.Link as={NavLink} to="/inscription">Inscription</Nav.Link>
              <Nav.Link as={NavLink} to="/connexion">Connexion</Nav.Link>
            </>
          )}
          {isLoggedIn && (
            <Nav.Link as={NavLink} to="/deconnexion">Déconnexion</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
