import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage';
import './style.css';

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!email || !password) return;
            const response = await api.post('/login', { email, senha: password });
            const { token, usuario } = response.data;
            setItem('token', token);
            setItem('nome', usuario.nome);
            setItem('email', usuario.email);
            navigate('/main');
        } catch (error) {
            console.log(error.response.data.mensagem);
        }
    }

    useEffect(() => {
        const token = getItem('token');
        if (token) {
            navigate('/main');
        }
    }, []);

    return (
        <div className='container sign-in-background'>
            <Header />
            <div className='container-sign-in'>
                <div className='container-text-area'>
                    <h1>Controle suas <span>finanças</span>,<br />sem planilha chata.</h1>
                    <p>Organizar as suas finanças nunca foi tão fácil,<br />com o DINDIN, você tem tudo num único lugar<br />e em um clique de distância.</p>
                    <button className='primary-button button-text-area' onClick={() => navigate('/sign-up')}>Cadastre-se</button>
                </div>
                <div className='container-login'>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='email'>E-mail</label>
                        <input id='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='primary-button button-form-sign-in'>Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;