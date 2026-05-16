import { useState } from "react";
import Button from "./button";
import Input from "./input";

export default function Modal({ isOpen, onClose, nome, preco, quantidade, imagem , categoria }) {
    const [formData, setFormData] = useState({
        nome: nome || "",
        categoria: categoria || "",
        valor: preco || "",
        quantidade: quantidade || 0,
        imagem: imagem || ""
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "quantidade" ? parseInt(value) || 0 : value
        }));
    };

    const handleQuantityChange = (qtd) => {
        setFormData(prev => ({
            ...prev,
            quantidade: Math.max(0, prev.quantidade + qtd)
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    imagem: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="modal fade show align-items-center d-flex " role="dialog sombra">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                <div className="modal-content p-3 p-md-4 rounded-3 shadow position-relative  d-flex justify-content-center align-items-center">

                    <button
                        type="button"
                        className="btn-close position-absolute top-0 end-0 m-3"
                        onClick={onClose}
                        aria-label="Fechar modal"
                    />

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-md-5 text-center d-flex flex-column align-items-center mb-3 mb-md-0">
                                <div className="mb-2">
                                    {formData.imagem ? (
                                        <img
                                            src={formData.imagem}
                                            alt={`Imagem do produto ${formData.nome}`}
                                            className="rounded img-fluid"
                                            style={{ maxHeight: "200px", objectFit: "cover" }}
                                        />
                                    ) : (
                                        <div
                                            className="border border-2 border-secondary-subtle rounded d-flex align-items-center justify-content-center w-100"
                                            style={{ height: "200px" }}
                                        >
                                            <span className="text-secondary">Sem imagem</span>
                                        </div>
                                    )}
                                </div>

                                <label className="btn m-0 fw-normal p-0 small">
                                    <i className="bi bi-upload"></i>
                                    Subir imagem do produto
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        hidden
                                    />
                                </label>
                            </div>

                            <div className="col-12 col-md-7">

                                <div className="mb-2">
                                    <Input
                                        id="nome"
                                        label="Nome do produto"
                                        type="text"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="mb-2">
                                    <Input
                                        id="categoria"
                                        label="Categoria"
                                        type="text"
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <Input
                                            id="valor"
                                            label="Valor"
                                            type="text"
                                            name="valor"
                                            value={formData.valor}
                                            onChange={handleInputChange}
                                            className="w-100"
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label htmlFor="quantidade" className="m-0">
                                            Quantidade
                                        </label>
                                        <div className="input-group">
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(-1)}
                                                className="btn shadow fw-bold text-black"
                                            >
                                                −
                                            </button>
                                            <input
                                                id="quantidade"
                                                type="text"
                                                name="quantidade"
                                                value={formData.quantidade}
                                                onChange={handleInputChange}
                                                className="form-control text-center p-0"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(1)}
                                                className="btn shadow fw-bold text-black"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-around gap-2 mt-3">
                        <div className="w-100 w-md-auto">
                            <Button label="Salvar" color="azul-claro" />
                        </div>
                        <div className="w-100 w-md-auto">
                            <Button label="Apagar" color="vermelho" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}