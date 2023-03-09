import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import api from '../../services/api';
import './style.css';

const registerForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...registerForm });
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!form.name || !form.email || !form.password || !form.confirmPassword) return;
      if (form.password !== form.confirmPassword) return;
      const response = await api.post('/usuario',
        {
          nome: form.name,
          email: form.email,
          senha: form.password
        }
      );
      navigate('/sign-in');
    } catch (error) {
      console.log(error.response.data.mensagem);
    }
  }

  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  return (
    <div className='container container-sign-up'>
      <Header />
      <div className='content-sign-up'>
        <h2>Cadastre-se</h2>
        <form onSubmit={handleSubmit}>
          <div className='container-inputs'>
            <label htmlFor='name'>Nome</label>
            <input
              id='name'
              type="text"
              name='name'
              value={form.name}
              onChange={handleChangeForm}
            />
          </div>
          <div className='container-inputs'>
            <label htmlFor='email'>E-mail</label>
            <input
              id='email'
              type="text"
              name='email'
              value={form.email}
              onChange={handleChangeForm}
            />
          </div>
          <div className='container-inputs'>
            <label htmlFor='password'>Senha</label>
            <input
              id='password'
              type="password"
              name='password'
              value={form.password}
              onChange={handleChangeForm}
            />
          </div>
          <div className='container-inputs'>
            <label htmlFor='confirm-password'>Confirmação de senha</label>
            <input
              id='confirm-password'
              type="password"
              name='confirmPassword'
              value={form.confirmPassword}
              onChange={handleChangeForm}
            />
          </div>
          <button className='primary-button button-form-sign-up'>Cadastrar</button>
          <Link className='text-link' to="/sign-in">Já tem cadastro? Clique aqui!</Link>
        </form>
      </div>
    </div >
  );
}

export default SignUp;