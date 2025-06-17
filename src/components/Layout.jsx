import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* On pourra ajouter une barre de navigation ici */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
