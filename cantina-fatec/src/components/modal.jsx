import { useState } from "react";
import Button from "./button";
import Input from "./input";
import Seletor from "@/components/seletor";

export default function Modal({ isOpen, onClose, nome, preco, quantidade, imagemUrl, categoria }) {
    const estiloErro = 'border border-danger';
    const [valorErro, setValorErro] = useState('');
    const [categoriaErro, setCategoriaErro] = useState('');
    const [nomeErro, setNomeErro] = useState('');

    const [formData, setFormData] = useState({
        nome: nome || "",
        categoria: categoria || "",
        valor: preco || "",
        quantidade: quantidade || 0,
        imagemUrl: imagemUrl || ""
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "valor") {
            const apenasNumeros = value.replace(/\D/g, "");

            const valorFormatado = (Number(apenasNumeros) / 100).toFixed(2);

            setFormData(prev => ({
                ...prev,
                valor: valorFormatado
            }));

            return;
        }

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
                    imagemUrl: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (!formData.nome.trim()) setNomeErro("O nome do produto é obrigatório.");
        if (!formData.categoria.trim()) setCategoriaErro("A categoria é obrigatória.");
        if (!formData.valor || isNaN(formData.valor) <= 0) setValorErro("Valor inválido.");
    }

    return (
        <div className="modal fade show align-items-center d-flex " role="dialog ">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                <div className="modal-content p-3 p-md-4 rounded-3 shadow position-relative border-0 d-flex justify-content-center align-items-center">
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
                                    {formData.imagemUrl ? (
                                        <img
                                            src={formData.imagemUrl}
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
                                        className={`${nomeErro ? estiloErro : ''}`}
                                    />
                                </div>

                                <div className="mb-2">
                                    <Seletor
                                        name="categoria"
                                        label="Categoria"
                                        options={["Bebidas", "Lanches", "Bomboniere"]}
                                        value={formData.categoria}
                                        onChange={handleInputChange}
                                        className={`${categoriaErro ? estiloErro : ''}`}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <Input
                                            id="valor"
                                            label="Valor"
                                            type="text"
                                            name="valor"
                                            value={Number(formData.valor || 0).toFixed(2).replace('.', ',')}
                                            onChange={handleInputChange}
                                            className={`w-100 ${valorErro ? estiloErro : ''}`}
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
                                                min="0"
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
                            <Button label="Salvar" className="azul-claro" onClick={handleSave} />
                        </div>
                        <div className="w-100 w-md-auto">
                            <Button label="Apagar" className="vermelho" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}