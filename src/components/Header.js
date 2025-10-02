import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="header-title">
          BrandConnect
        </Link>
        <nav className="header-nav">
          <Link to="/about" className="nav-link">О платформе</Link>
          <Link to="/contacts" className="nav-link">Контакты</Link>
          
          {isAuthenticated ? (
            <div className="user-section">
              <Link to="/dashboard" className="nav-link">
                Кабинет
              </Link>
              <span className="user-greeting" title={user?.name}>
                Привет, {user?.name.split(' ')[0]}
              </span>
              <button onClick={handleLogout} className="logout-btn-header" title="Выйти">
                🚪
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">Войти</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;