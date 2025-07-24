import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch('https://offers-api.digistos.com/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Échec de la déconnexion');
        }

      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error.message || error);
      } finally {
        localStorage.removeItem('auth');
        navigate('/connexion');
      }
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;

