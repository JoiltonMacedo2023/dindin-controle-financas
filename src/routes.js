import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import { getItem } from './utils/storage';

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
    return (
        <Routes>
            {['/', '/sign-in'].map((path, index) => <Route path={path} key={index} element={<SignIn />} />)}
            <Route path='/sign-up' element={<SignUp />} />
            <Route element={<ProtectedRoutes redirectTo={'/sign-in'} />}>
                <Route path='/main' element={<Main />} />
            </Route>
        </Routes>
    )
}

export default MainRoutes;