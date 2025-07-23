import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/authSlice";

const Logout = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (token) {
          const response = await fetch('https://offers-api.digistos.com/api/auth/logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Erreur lors de la déconnexion");
          }
        }
      } catch (err) {
        console.error("Erreur API logout :", err.message || err);
      } finally {
        dispatch(logout());
        navigate("/connexion");
      }
    };

    handleLogout();
  }, [dispatch, navigate, token]);

  return null;
};

export default Logout;
