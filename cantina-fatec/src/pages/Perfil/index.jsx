import Header from "@/components/header";
import Input from "@/components/input";
import Seletor from "@/components/seletor";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import api from "@/services/api";

export default function Perfil() {

  const buscarPerfil = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await api.get('/usuarios/perfil', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;

    } catch (error) {
      console.error('Erro ao buscar perfil:', error);

      alert(
        error.response?.data?.detalhes ||
        'Erro ao carregar perfil'
      );
    }
  };

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    chavePix: '',
    password: '',
    passwordConfirm: '',
    relatorio: false,
    frequencia: 'Diariamente',
  });
  useEffect(() => {
    const carregarPerfil = async () => {
      const dados = await buscarPerfil();

      if (dados) {
        setProfile(dados);

        setFormData({
          email: dados.email || '',
          chavePix: dados.chavePix || '',
          password: '',
          passwordConfirm: '',
          relatorio: false,
          frequencia: 'Diariamente',
        });
      }
    };

    carregarPerfil();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};

    if (formData.password) {
      if (formData.password !== formData.passwordConfirm) {
        alert('As senhas precisam ser iguais!');
        return;
      }

      data.senha = formData.password;
    }

    if (formData.email !== profile.email) {
      data.email = formData.email;
    }

    if (formData.chavePix !== profile.chavePix) {
      data.chavePix = formData.chavePix;
    }

    if (data && Object.keys(data).length > 0) {
      const token = localStorage.getItem('token');

      try {
        const response = await api.put(
          '/usuarios/perfil',
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(response.data.mensagem);

      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);

        alert(
          error.response?.data?.detalhes ||
          'Ocorreu um erro ao atualizar o perfil.'
        );
      }
    }
  }
  return (
    <>
      <Header
        title="Perfil"
        subtitle="Informações da Cantina"
      ></Header>

      <div className="d-flex flex-column align-items-center mt-4">
        <form>
          <div className="d-flex flex-md-row flex-column w-100 justify-content-center gap-md-5 ">
            <Input
              className="mb-2"
              type="text"
              label="E-mail"
              name="email"
              value={formData.email}
              placeholder="fulano.cantina@fatec.sp.gov.br"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
            <Input
              className="mb-2"
              type="text"
              label="Chave Pix"
              name="chavePix"
              value={formData.chavePix}
              placeholder="Chave Pix"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  chavePix: e.target.value,
                })
              }
            />
          </div>

          <div className="d-flex flex-md-row flex-column w-100 justify-content-center gap-md-5">
            <Input
              className="mb-2"
              type="password"
              label="Nova Senha"
              name="password"
              value={formData.password}
              placeholder="*******"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
            <Input
              className="mb-2"
              type="password"
              label="Confirmar Nova Senha"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              placeholder="*******"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passwordConfirm: e.target.value,
                })
              }
            />
          </div>

          <div className="d-flex flex-md-row flex-column align-items-center w-100 gap-md-5 ">
            <div className="d-flex flex-row mb-2">
              <input type="checkbox" id="relatorio" name="relatorio" disabled />
              <label htmlFor="relatorio" className="mx-2">Enviar relatório de vendas por e-mail</label>
            </div>
            <Seletor
              label="Frequência:"
              name="frequencia"
              options={['Diariamente']}
            ></Seletor>
          </div>

          <div className="d-flex flex-md-row flex-column justify-content-center gap-md-5 mt-3 gap-3 mx-5">
            <Button
              label="Sair"
              className='vermelho'
              onClick={() => {
                if (confirm('Deseja mesmo deslogar da sua conta?')) {
                  localStorage.removeItem('token');
                  window.location.href = '/';
                }
              }}
            ></Button>
            <Button
              label="Salvar"
              className='azul'
              onClick={handleSubmit}

            ></Button>
          </div>
        </form>
      </div>
    </>
  );
};
