import Header from "@/components/header";
import Seletor from "@/components/seletor";
import CardProduto from "@/components/card";
import api from "@/services/api";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";

const Estoque = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [produtos, setProdutos] = useState(null);
  const [loading, setLoading] = useState(true)

  const novoProduto = () => {
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/api/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div>
      <Header
        title="Administre o Estoque"
        subtitle="Adicione novos produtos ou administre eles!"
      ></Header>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-2 gap-2">
        <div 
          className="d-flex align-items-center "
          onClick={novoProduto}
          style={{ cursor: 'pointer'}}
          >
          <i className="bi bi-plus text-danger fs-2"></i>
          <label className="fw-bold">
            Novo Produto
          </label>
        </div>

        <Seletor
          label={"Ordenar por:"}
          options={["Menos Quantidade", "Mais Quantidade"]}
          orientation={"horizontal"}
        />
      </div>

      <div className="d-flex flex-wrap gap-3 p-3 align-items-stretch justify-content-center">
        {
          produtos ? (
            produtos.map((produto, i) => (
              <CardProduto
                key={i}
                name={produto.nome}
                image={produto.imagem}
                price={produto.preco}
                category={produto.categoria}
                quantity={2}
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
            <Modal 
              isOpen={isModalOpen}
              onClose={fecharModal}
              nome={''}
              preco={''}
              quantidade={0}
              imagem={''}
            />
    </div>
  );
};

export default Estoque;