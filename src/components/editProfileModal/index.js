import { useState } from 'react';
import close from '../../assets/close-icon.svg';
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage';
import './style.css';

function EditProfile({ setOpenModalEditProfile }) {
    const [userName, setUserName] = useState(getItem('nome'));
    const [userEmail, setUserEmail] = useState(getItem('email'));
    const [userPassword, setUserPassword] = useState('');
    const [confirmUserPassword, setConfirmUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmitEditProfile(e) {
        e.preventDefault();

        try {
            if (!userName || !userEmail || !userPassword || !confirmUserPassword) {
                setErrorMessage('Todos os campos devem ser preenchidos!');
                return;
            }

            if (userPassword !== confirmUserPassword) {
                setErrorMessage('As senhas devem ser iguais!');
                return;
            }

            const token = getItem('token');

            const response = await api.put('/usuario',
                {
                    nome: userName,
                    email: userEmail,
                    senha: userPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setItem('nome', userName);
            setItem('email', userEmail);
            setOpenModalEditProfile(false);
        } catch (error) {
            console.log(error.response.data.mensagem);
        }
    }

    return (
        <div className='modal-background'>
            <div className='modal__register__transaction'>
                <div className='modal_title'>
                    <h1>Editar Perfil</h1>
                    <img className='modal__profile__transaction__close' src={close} alt="close" onClick={() => (setOpenModalEditProfile(false))} />
                </div>
                <form className='modal__register__transaction__inputs' onSubmit={handleSubmitEditProfile}>
                    <label htmlFor='nome'>Nome</label>
                    <input name='nome' id='nome' type="text" value={userName}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />

                    <label htmlFor='email'>Email</label>
                    <input name='email' id='email' type="text" value={userEmail}
                        onChange={(e) => { setUserEmail(e.target.value) }}
                    />

                    <label htmlFor='senha'>Senha</label>
                    <input name='senha' id='senha' type="password" onChange={(e) => { setUserPassword(e.target.value) }} />
                    <label htmlFor='confirmar-senha'>Confirmar Senha</label>
                    <input name='confirmarSenha' id='confirmar-senha' type="password" onChange={(e) => { setConfirmUserPassword(e.target.value) }} />

                    <span className='error'>{errorMessage}</span>

                    <button className='btn-edit-profile'>Confirmar</button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile; 