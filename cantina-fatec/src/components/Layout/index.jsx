import { Outlet } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from '@/components/Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;