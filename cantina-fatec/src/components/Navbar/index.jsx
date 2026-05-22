import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "@/assets/logo_fatec_br.png";

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <nav className="d-none d-md-flex justify-content-between align-items-center p-3 m-0">

        <div className="m-0">
          <Link to="/pedidos" className="text-white text-decoration-none">
            <img src={logo} alt="Fatec" width={120} />
          </Link>
        </div>

        <ul className="d-flex list-unstyled gap-2 m-0 pe-2">

          <li>
            <Link
              to="/estoque"
              className={`text-white fw-medium px-3 py-2 rounded d-flex align-items-center ${location.pathname === "/estoque" ? "" : "text-decoration-none"}`}
            >
              <i className="bi bi-basket me-2"></i>
              Estoque
            </Link>
          </li>

          <li>
            <Link
              to="/pedidos"
              className={`text-white fw-medium px-3 py-2 rounded d-flex align-items-center ${location.pathname === "/pedidos" ? "" : "text-decoration-none"}`}
            >
              <i className="bi bi-card-list me-2"></i>
              Pedidos
            </Link>
          </li>

          <li>
            <Link
              to="/perfil"
              className={`text-white fw-medium px-3 py-2 rounded d-flex align-items-center ${location.pathname === "/perfil" ? "" : "text-decoration-none"}`}
            >
              <i className="bi bi-person me-2"></i>
              Perfil
            </Link>
          </li>

        </ul>
      </nav>

      <nav className="d-flex d-md-none justify-content-around align-items-center position-fixed bottom-0 start-0 w-100 py-1 ">

        <Link
          to="/estoque"
          className={`d-flex flex-column align-items-center text-white fw-medium ${location.pathname === "/estoque" ? "" : "text-decoration-none"}`}
        >
          <i className="bi bi-basket fs-5"></i>
          Estoque
        </Link>

        <Link
          to="/pedidos"
          className={`d-flex flex-column align-items-center text-white fw-medium ${location.pathname === "/pedidos" ? "" : "text-decoration-none"}`}
        >
          <i className="bi bi-card-list fs-5"></i>
          Pedidos
        </Link>

        <Link
          to="/perfil"
          className={`d-flex flex-column align-items-center text-white fw-medium ${location.pathname === "/perfil" ? "" : "text-decoration-none"}`}
        >
          <i className="bi bi-person fs-5"></i>
          Perfil
        </Link>

      </nav>
    </>
  );
};

export default Navbar;