import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Retour = () => {
  const navigate = useNavigate();

  const handleRetour = () => {
    navigate("/", { replace: true });
    window.location.reload(); // Recharger la page pour un retour propre
  };

  return (
    <nav className="retour-nav">
      <button onClick={handleRetour} className="retour-btn">
        <FontAwesomeIcon icon={faHome} /> Retour
      </button>
    </nav>
  );
};

export default Retour;
