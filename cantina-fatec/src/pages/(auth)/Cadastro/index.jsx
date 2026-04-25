import Input from '@/components/input';
import Button from '@/components/button';
import api from '@/services/api';
import '../auth.css';
import Seletor from '@/components/seletor';
import { useState } from 'react';

const Login = () => {
  const options = ['f113 - Fatec Mauá']

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false); 
  const [estilo , setEstilo] = useState('');

 async function handleRegister(e) {
    e.preventDefault();

    setLoading(true); 
    try {
      const response = await api.post('/usuarios/login', {
          email: email,
          senha: senha
        })
      setEstilo('border border-danger');
      setLoading(false);

    } catch (error) {
      
      if(error === 404){
        try{
          const response = await api.post('/usuarios/registrar', {
            nome: nome,
            email: email,
            senha: senha,
            role: "ADMIN_UNIDADE"
          })
        
          window.location.href = '/';

        } catch (error) {
          alert('Não foi possível concluir a solicitação.');  

        } finally {
          setLoading(false);
        }
      }
    }
  }

  return (
    <div className='auth justify-content-center d-flex flex-column align-items-center'>
      <h1 className='text-white m-4'>Fatec</h1>

      <div className='form d-flex flex-column align-items-center justify-content-center py-5 px-3 mb-4 rounded '>
        <h2>
          Área da Cantina
        </h2>

        <form onSubmit={handleRegister} className='p-4 gap-3 d-flex flex-column'>
          <label className= 'fw-medium' htmlFor='email'>
            Faça seu Cadastro:
          </label>

          <Input
            type='text'
            className={estilo}
            name='email'
            label='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='fulano.silva@fatec.sp.gov.br'
          />
          {estilo ? <span className='text-danger d-relative m-0'>E-mail já cadastrado.</span> : null}
          <Seletor 
            label={"Selecione Sua Unidade"}
            default={options[0]}
            options={options}
            value={options[0]}
            onChange={(e) => setNome(e.target.value)}
            name='nome'
            />
          <Input
            type='password'
            name='password'
            label='Senha'
            placeholder='••••••••'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}  
          />
          <Input
            type='password'
            name='confirmPassword'
            label='Confirmar Senha'
            placeholder='••••••••'
          />

          <Button 
            type='submit' 
            disabled={loading}
          >
            {loading ? (
              <>
                <span 
                  className="spinner-border spinner-border-sm mx-2" 
                  role="status"
                />
                Cadastrando...
              </>
            ) : (
              'Cadastrar'
            )}
          </Button>
        </form>
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