import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard1';
import Profile from './pages/user/ProfilePage';
import Header from './components/Header';
import AdminLogin from './pages/admin/Login'
import AdminHome from './pages/admin/Home'
function App() {
  return (
    <>
    
      <ToastContainer />
   
    <Router>
      <div className="container">
        <Header/>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/profile' element={<Profile />}></Route>

          <Route path='/adminLogin' element={<AdminLogin />}></Route>
          <Route path='/admin/home' element={<AdminHome />}></Route>
        </Routes>
      </div>
    </Router>
   
    </>
  );
}

export default App;
