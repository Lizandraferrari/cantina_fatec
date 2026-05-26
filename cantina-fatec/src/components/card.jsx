import { useState } from "react";
import Button from "./button";
import Modal from "./modal";

export default function CardProduto({ name, image, price, quantity, category , id , atualizarProdutos}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const editarProduto = () => {
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <article className="sombra p-4 text-center w-100 w-sm-auto rounded " style={{ maxWidth: "300px" }}>
        <img
          src={image}
          alt={`Imagem do produto ${name}`}
          className="img-fluid w-100 rounded-top"
          style={{ aspectRatio: "1/1", objectFit: "cover" }}
        />

        <h3 className="fs-4 m-2 text-black fw-medium">{name}</h3>

        <div className="d-flex justify-content-between align-items-center">

          <div className="d-flex flex-column align-items-start">
            <p className="text-decoration-underline fs-5 m-2 mb-0">
              R${price.toFixed(2).replace('.', ',')}
            </p>
          </div>

          <div className="d-flex flex-column align-items-center">
            <p className="m-2 mb-0">Em estoque:</p>
            <p className="fw-semibold fs-5 m-2 mt-0">
              {quantity}
            </p>
          </div>

        </div>

        <Button
          label="Editar"
          className="mt-2"
          aria-label="Editar"
          onClick={editarProduto}
        >

        </Button>
      </article>

      <Modal
        id={id}
        isOpen={isModalOpen}
        onClose={fecharModal}
        nome={name}
        preco={price}
        quantidade={quantity}
        imagemUrl={image}
        categoria={category}
        atualizarProdutos={atualizarProdutos}
      />
    </>
  )
}