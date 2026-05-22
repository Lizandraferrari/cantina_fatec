import Input from '@/components/input';
import Button from '@/components/button';
import api from '@/services/api';
import '../auth.css';
import Seletor from '@/components/seletor';
import { useState } from 'react';
import logo from "@/assets/logo_fatec_br.png";

const Login = () => {
  const options = ['f113 - Fatec Mauá']

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false); 
  
  const [emailErro, setEmailErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');

  const estiloErro = 'border border-danger';

  async function handleRegister(e) {
    e.preventDefault();

    if (senha !== confirmSenha) {
      setSenhaErro("As senhas devem ser iguais.");
      setLoading(false);

    } else {
      setSenhaErro('');
    }

    setLoading(true); 
    try {
      const response = await api.post('/usuarios/login', {
          email: email,
          senha: senha
        })
      setEmailErro('E-mail já cadastrado.');
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
      <img src={logo} alt="Fatec" width={150} />

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
            className={emailErro ? estiloErro : ''}
            name='email'
            label='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='fulano.silva@fatec.sp.gov.br'
          />
          {emailErro ? <span className='text-danger d-relative m-0'>{emailErro}</span> : null}
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
            className={senhaErro ? estiloErro : ''}
            placeholder='••••••••'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}  
          />
          {senhaErro && <span className='text-danger d-relative'>{senhaErro}</span>}

          <Input
            type='password'
            name='confirmPassword'
            label='Confirmar Senha'
            className={senhaErro ? estiloErro : ''}
            placeholder='••••••••'
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
          />
          {senhaErro && <span className='text-danger d-relative m-0'>{senhaErro}</span>}

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