import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      try {
        if (token) {
          const response = await fetch('https://offers-api.digistos.com/api/auth/logout', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Erreur lors de la déconnexion");
          }
        }
      } catch (err) {
        console.error("Erreur lors de la déconnexion :", err.message || err);
      } finally {
        localStorage.removeItem("auth");
        navigate("/connexion");
      }
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;
