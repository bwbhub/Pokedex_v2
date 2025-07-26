import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalHeader from './GlobalHeader/GlobalHeader';

const Layout = () => {
  return (
    <div>
      <GlobalHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
