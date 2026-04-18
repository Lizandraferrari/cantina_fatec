import { useState } from 'react';
import Input from '@/components/input';
import Button from '@/components/button';
import api from '@/services/api';
import '../auth.css';

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await api.post('/usuarios/login', {
        email: email,
        senha: senha
      })

      const token = response.data.token
      console.log('Token recebido:', token)
      localStorage.setItem('token', token)
      window.location.href = '/pedidos'

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='auth justify-content-center d-flex flex-column align-items-center'>
      <h1 className='text-white m-4'>Fatec</h1>

      <div className='form d-flex flex-column align-items-center justify-content-center py-5 px-3 mb-4 rounded '>
        <h2>
          Área da Cantina
        </h2>

        <form onSubmit={handleLogin} className='p-4 gap-3 d-flex flex-column'>
          <label className='fw-medium' htmlFor='email'>
            Faça seu Login:
          </label>

          <Input
            type='text'
            name='email'
            label='E-mail'
            placeholder='fulano.silva@fatec.sp.gov.br'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type='password'
            name='password'
            label='Senha'
            placeholder='••••••••'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <Button
            label='Entrar'
            type='submit'
          />
        </form>

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