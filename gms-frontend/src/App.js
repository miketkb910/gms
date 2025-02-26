import './App.css';
import Home from './pages/home/home';
import {Routes, Route,useNavigate} from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import Sidebar from './components/sidebar/sidebar';
import {useState,useEffect} from 'react';
import Members from './pages/members/members';
import Generaluser from './pages/generaluser/generaluser';
import Memberdetail from './pages/memberdetail/memberdetail';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const isLogedIn = localStorage.getItem("isogin");
        if (isLogedIn) {
            setIsLogin(true);
            navigate('/dashboard');
        }else{
            setIsLogin(false);
            navigate('/');
        }
    }, [localStorage.getItem("isogin")]);

    return (
        <div className='w-full h-[100vh] flex'>
            {isLogin && <Sidebar />}
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/members' element={<Members/>} />
                <Route path='/specific/:page' element={<Generaluser/>} />
                <Route path='/members/:id' element={<Memberdetail/>} />
            </Routes>
        </div>
    );
}

export default App;
