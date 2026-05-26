import Header from "@/components/header";
import CardPedido from '@/components/cardPedido';
import FiltroPedido from '@/components/filtroPedido';
import Seletor from '@/components/seletor';
import { useState , useEffect } from 'react';
import api from "@/services/api";

const Pedidos = () => {

  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filtro, setFiltro] = useState({
    periodoInicio: '',
    periodoFim: '',
    cliente: '',
    status: 'Pendente',
  });

  const [pedidos, setPedidos] = useState(null);

    useEffect(() => {
      const fetchPedidos = async () => {
        try {
          const response = await api.get('/pedidos');
          setPedidos(response.data);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
  
      fetchPedidos();
    }, []);

  return (
    <div>
      <div className="container-fluid ">
        <div className="row min-vh-100">
          {
            sidebarOpen && (
              <FiltroPedido
                filtro={filtro}
                setFiltro={setFiltro}
                onClose={() => setSidebarOpen(false)}
              />
            )
          }

          <div className={`${sidebarOpen ? "col-md-9 col-lg-10" : "col-12"}`}>

            {
              !sidebarOpen && (
                <div className="d-none d-md-block">
                  <button
                    className="btn position-fixed start-0 mt-2 ms-2 z-3"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              )
            }

            <Header
              title="Pedidos"
              subtitle="Gerencie os pedidos recebidos"
            />

            <div className="d-flex d-md-none align-items-center justify-content-center m-0">
              <button
                className="btn me-2 fw-medium"
                onClick={() => setSidebarOpen(true)}
              >
                <i className="bi bi-filter mx-2 fs-3"></i>
                Filtrar por
              </button>
            </div>

            <div className="d-flex flex-row justify-content-md-end justify-content-center my-3">
              <div className="w-md-25">
              <Seletor
                label="Ordenar por:"
                options={["Mais recente", "Mais antigo"]}
                orientation={"horizontal"}
              />
              </div>
            </div>
            <div>
              {
                pedidos ? (
                  pedidos.map((pedido) => (
                    <CardPedido
                      key={pedido.id}
                      pedido={pedido}
                    />
                  ))
                ) : loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm mx-1 text-danger"
                      role="status"
                    />
                    Carregando...
                  </>
                ) : (
                  <p className="text-danger fw-bold">
                    Não foi possível carregar os produtos. Tente novamente mais tarde.
                  </p>
                )
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedidos;