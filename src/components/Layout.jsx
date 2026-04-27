import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';

const Layout = () => {
  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="logo">
          <BarChart3 className="logo-icon" size={28} />
          <span>StrawPoll</span>
        </Link>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
