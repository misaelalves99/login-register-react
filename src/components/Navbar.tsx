// src/components/Navbar.tsx

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    if (location.pathname) {
      setCurrentPath(location.pathname);
    }
  }, [location]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Meu E-Commerce
        </Link>
        <div className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.link} ${currentPath === "/" ? styles.active : ""}`}
          >
            Home
          </Link>
          <Link
            to="/login"
            className={`${styles.link} ${currentPath === "/login" ? styles.active : ""}`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`${styles.link} ${currentPath === "/register" ? styles.active : ""}`}
          >
            Registro
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
