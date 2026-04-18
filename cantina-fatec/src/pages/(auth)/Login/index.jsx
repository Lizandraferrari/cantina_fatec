import Input from '../../../components/input';
import Button from '../../../components/button';
import '../auth.css';

const Login = () => {
  return (
    <div className='auth justify-content-center d-flex flex-column align-items-center'>
      <h1 className='text-white m-4'>Fatec</h1>

      <div className='form d-flex flex-column align-items-center justify-content-center py-5 px-3 mb-4 rounded '>
        <h2>
          Área da Cantina
        </h2>

        <div className='p-4 gap-3 d-flex flex-column'>
          <label className= 'fw-medium' htmlFor='email'>
            Faça seu Login:
          </label>

          <Input
            type='text'
            name='email'
            label='E-mail'
            placeholder='fulano.silva@fatec.sp.gov.br'
          />
          <Input
            type='password'
            name='password'
            label='Senha'
            placeholder='••••••••'
          />
          <Button
            label='Entrar'
            type='submit'
            
          />
        </div>
        <a
          className='text-decoration-underline'
          href='/cadastro'
        >
          Não tem uma conta? Cadastre-se
        </a>
      </div>
    </div>
  );
};

export default Login;