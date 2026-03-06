import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@store/AuthContext';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          MaFinBuSi
        </Link>
      </div>
      <nav className="nav">
        <NavLink to="/" className="nav-link">
          Главная
        </NavLink>
        <NavLink to="/basket" className="nav-link">
          Корзина
        </NavLink>
      </nav>
      <div className="header-right">
        {isAuthenticated && user ? (
          <>
            <span className="header-user">{user.name}</span>
            <button type="button" className="btn secondary" onClick={handleLogout}>
              Выйти
            </button>
          </>
        ) : (
          <NavLink to="/auth" className="btn ghost">
            Войти
          </NavLink>
        )}
      </div>
    </header>
  );
};

