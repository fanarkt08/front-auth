import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // (1) Appel API pour notifier la déconnexion
        await fetch('https://offers-api.digistos.com/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      } finally {
        // (2) Suppression du token côté frontend
        localStorage.removeItem('auth');

        // (3) Redirection vers la page de login
        navigate('/connexion');
      }


    };

    handleLogout();
  }, [navigate]);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
