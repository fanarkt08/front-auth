import { useState } from "react";
import { useNavigate } from 'react-router';
import { Form, Button, Container, Card, Row, Col, Alert } from "react-bootstrap";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  try {
    const response = await fetch('https://offers-api.digistos.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Erreur lors de la connexion'
      };
    }

    if (!data.expires_in) {
      throw new Error("Réponse invalide : expire_in manquant");
    }

    const expiresAt = new Date(Date.now() + data.expires_in * 1000).toISOString();
    localStorage.setItem('auth', JSON.stringify({ expiresAt }));

    window.dispatchEvent(new Event("authChanged"));

    navigate('/offres/professionnelles');

  } catch (err) {
    console.error("Erreur lors de la connexion :", err.message || err);

    if (err.status === 401) {
      setError("Identifiants invalides. Veuillez réessayer.");
    } else {
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  }
};

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            <h1 className="text-center mb-4">Se connecter</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Se connecter
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
