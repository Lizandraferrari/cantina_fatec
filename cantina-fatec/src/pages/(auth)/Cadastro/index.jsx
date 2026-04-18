import Input from '../../../components/input';
import Button from '../../../components/button';
import '../auth.css';
import Seletor from '../../../components/seletor';

const Login = () => {
  const options = ['f113 - Fatec Mauá']

  return (
    <div className='auth justify-content-center d-flex flex-column align-items-center'>
      <h1 className='text-white m-4'>Fatec</h1>

      <div className='form d-flex flex-column align-items-center justify-content-center py-5 px-3 mb-4 rounded '>
        <h2>
          Área da Cantina
        </h2>

        <div className='p-4 gap-3 d-flex flex-column'>
          <label className= 'fw-medium' htmlFor='email'>
            Faça seu Cadastro:
          </label>

          <Input
            type='text'
            name='email'
            label='E-mail'
            placeholder='fulano.silva@fatec.sp.gov.br'
          />
          <Seletor 
            label={"Selecione Sua Unidade"}
            default={options[0]}
            options={options}
            />
          <Input
            type='password'
            name='password'
            label='Senha'
            placeholder='••••••••'
          />
          <Input
            type='password'
            name='confirmPassword'
            label='Confirmar Senha'
            placeholder='••••••••'
          />
          <Button
            label='Entrar'
            type='submit'
            
          />
        </div>
        <a
          className='text-decoration-underline'
          href='/'
        >
          Já tem uma conta? Entre
        </a>
      </div>
    </div>
  );
};

export default Login;