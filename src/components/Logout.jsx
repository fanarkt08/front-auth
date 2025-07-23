import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleLogout = async () => {
      const auth = JSON.parse(localStorage.getItem("auth"));

      if (auth?.token) {
        try {
          const response = await fetch('https://offers-api.digistos.com/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Erreur lors de la déconnexion");
          }

        } catch (err) {
          console.error("Erreur lors de la déconnexion :", err.message || err);
          setError("Une erreur est survenue lors de la déconnexion.");
        }
      }

      localStorage.removeItem("auth");
      navigate("/connexion");
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;
