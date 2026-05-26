import { useEffect, useState } from "react";import Button from "./button";
import Input from "./input";
import Seletor from "@/components/seletor";
import api from "@/services/api";

export default function Modal({ isOpen, onClose, nome, preco, quantidade, imagemUrl, categoria, id }) {
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
useEffect(() => {
    setFormData({
        nome: nome || "",
        categoria: categoria || "",
        valor: preco || "",
        quantidade: quantidade || 0,
        imagemUrl: imagemUrl || ""
    });
}, [nome, categoria, preco, quantidade, imagemUrl]);

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
                    imagemUrl: event.target.result,
                    imagem: file
                }));
            };

            reader.readAsDataURL(file);
        }
    };
    const handleSave = async () => {
        setNomeErro('');
        setCategoriaErro('');
        setValorErro('');
        let possuiErro = false;

        if (!formData.nome.trim()) {
            setNomeErro("O nome do produto é obrigatório.");
            possuiErro = true;
        }

        if (!formData.categoria.trim()) {
            setCategoriaErro("A categoria é obrigatória.");
            possuiErro = true;
        }

        const valorTratado = Number(
            String(formData.valor).replace(',', '.')
        );

        if (!formData.valor) {
            setValorErro("O valor é obrigatório.");
            possuiErro = true;
        } else if (isNaN(valorTratado) || valorTratado <= 0) {
            setValorErro("Valor inválido.");
            possuiErro = true;
        }

        if (possuiErro) return;

        const token = localStorage.getItem("token");
        try {

            const data = new FormData();

            data.append('nome', formData.nome);
            data.append('preco', valorTratado);
            data.append('categoria', formData.categoria);

            if (formData.imagem) {
                data.append('imagem', formData.imagem);
            }
            if (id) {
                await api.put(`/api/produtos/${id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });

                alert('Produto atualizado com sucesso.');

            }

            else {
                await api.post('/api/produtos', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                alert('Produto cadastrado com sucesso.');
            }

            onClose();

        } catch (error) {

            console.error(error);

            alert('Não foi possível salvar o produto.');
        }
    };

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
                                        options={["Bebida", "Lanche", "Bomboniere"]}
                                        value={formData.categoria}
                                        onChange={(value) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                categoria: value
                                            }));
                                        }}
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