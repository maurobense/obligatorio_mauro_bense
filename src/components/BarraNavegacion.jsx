import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faUser,
  faSignOutAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { logoutSuccess, logoutFailure } from "../redux/authSlice";
import { useDispatch } from "react-redux";

export const BarraNavegacion = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    logoutUser();
  };
  const logoutUser = async () => {
    try {
      localStorage.clear();
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };
  return (
    <div className={`side-navbar ${isOpen ? "open" : ""}`}>
      <div className="profile-section">
        <img src="profile.jpg" alt="Profile" />
        <p>Usuario</p>
      </div>
      <nav>
        <ul>
          <li>
            {isOpen ? (
              <>
                <FontAwesomeIcon icon={faHome} size="lg" />
                <span>Inicio</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faHome} size="lg" />
              </>
            )}
          </li>
          <li>
            {isOpen ? (
              <>
                <FontAwesomeIcon icon={faChartBar} size="lg" />
                <span>Dashboard</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faChartBar} size="lg" />
              </>
            )}
          </li>
          <li>
            {isOpen ? (
              <>
                <FontAwesomeIcon icon={faUser} size="lg" />
                <span>Perfil</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faUser} />
              </>
            )}
          </li>
        </ul>
      </nav>
      <div className="bottom-section">
        <div className="logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          {isOpen && (
            <>
              <span>Cerrar Sesión</span>
            </>
          )}
        </div>
        <div className="toggle-btn" onClick={toggleNavbar}>
          <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
        </div>
      </div>
    </div>
  );
};
