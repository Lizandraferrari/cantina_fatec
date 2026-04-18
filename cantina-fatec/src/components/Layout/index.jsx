import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from '@/components/Navbar';
import api from '@/services/api';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()

   useEffect(() => {
    const validarToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await api.get('/auth/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const valido = response.data.mensagem
        if (valido !== 'Ok') {
          localStorage.removeItem('token');
          
        }

      } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    validarToken();
  }, [location, navigate]);


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