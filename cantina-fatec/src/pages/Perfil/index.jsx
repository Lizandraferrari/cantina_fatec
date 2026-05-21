import Header from "@/components/header";
import Input from "@/components/input";
import Seletor from "@/components/seletor";
import Button from "@/components/button";

const Perfil = () => {
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
              name='email'
              placeholder="fulano.cantina@fatec.sp.gov.br"
            ></Input>
            <Input
              className="mb-2"
              type="text"
              label="Chave Pix"
              name='chavePix'
              placeholder="Chave Pix"
            ></Input>
          </div>

          <div className="d-flex flex-md-row flex-column w-100 justify-content-center gap-md-5">
            <Input
              className="mb-2"
              type="password"
              label="Nova Senha"
              name='novaSenha'
              placeholder="*******"
            ></Input>
            <Input
              className="mb-2"
              type="password"
              label="Confirmar Nova Senha"
              name='confirmarNovaSenha'
              placeholder="*******"
            ></Input>
          </div>

          <div className="d-flex flex-md-row flex-column align-items-center w-100 gap-md-5 ">
            <div className="d-flex flex-row mb-2">
              <input type="checkbox" id="relatorio" name="relatorio" />
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
            ></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Perfil;