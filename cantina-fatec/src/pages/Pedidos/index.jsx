import Header from "@/components/header";
import CardPedido from '@/components/cardPedido';
import FiltroPedido from '@/components/filtroPedido';
import Seletor from '@/components/seletor';
import { useState } from 'react';

const Pedidos = () => {

  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filtro, setFiltro] = useState({
    periodoInicio: '',
    periodoFim: '',
    cliente: '',
    status: 'Pendente',
  });

  const listaPedidos = [
    {
      id: 1807,
      nome: "Fulano da Silva JP",
      data: "17/03/2026 16:32",
      status: "cancelado",
      horastatus: "16:40",
      total: "R$ 13,00",
      itens: [
        "1 Café 50ml",
        "3 Pão",
      ],
    },
    {
      id: 1808,
      nome: "Maria Oliveira",
      data: "17/03/2026 17:05",
      status: "entregue",
      horastatus: "17:25",
      total: "R$ 42,50",
      itens: [
        "2 Coxinha",
        "1 Refrigerante 350ml",
        "1 Pudim",
      ],
    }
  ];

  return (
    <>
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

            <div className="d-flex flex-row justify-content-md-end justify-content-center mb-3">
              <Seletor
                label="Ordenar por"
                options={["Mais recente", "Mais antigo"]}
                orientation={"horizontal"}
              />
            </div>
            <div>
              {
                listaPedidos ? (
                  listaPedidos.map((pedido) => (
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
    </>
  );
};

export default Pedidos;