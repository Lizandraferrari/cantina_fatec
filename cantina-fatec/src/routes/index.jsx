import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/(auth)/Login';
import Cadastro from '../pages/(auth)/Cadastro';
import Pedidos from '../pages/Pedidos';
import Perfil from '../pages/Perfil';
import Estoque from '../pages/Estoque';
import Layout from '../components/Layout';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Layout />}>
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="estoque" element={<Estoque />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;