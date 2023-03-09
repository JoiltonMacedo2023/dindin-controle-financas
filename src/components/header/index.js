import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import LogoutIcon from '../../assets/logout.svg';
import ProfileIcon from '../../assets/profile-icon.svg';
import { getItem, removeItem } from '../../utils/storage';
import './style.css';

function Header({ setOpenModalEditProfile }) {
    const navigate = useNavigate();
    const username = getItem('nome');

    function handleLogout() {
        removeItem('token');
        removeItem('nome');
        navigate('/sign-in');
    }

    function handleCloseModalEditProfile() {
        setOpenModalEditProfile(true);
    }

    return (
        <header>
            <img src={Logo} alt='Logo' />
            {window.location.pathname === '/main' &&
                <nav>
                    <ul>
                        <li><img src={ProfileIcon} alt='Profile icon' onClick={handleCloseModalEditProfile} /></li>
                        <li className='username'><h2>{username.split(' ')[0]}</h2></li>
                        <li><img src={LogoutIcon} alt='Logout icon' onClick={handleLogout} /></li>
                    </ul>
                </nav>
            }
        </header>
    )
}

export default Header;