import {FaSignInAlt,FaSignOutAlt} from 'react-icons/fa'
import {Link,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { logout,reset } from '../features/auth/authSlice'
import { adminLogout,resetAdmin } from '../features/admin/adminSlice'
import { useDispatch } from 'react-redux'
function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.auth)
    const {admin} = useSelector((state)=>state.admin)

    const onLogout = ()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    const onAdminLogout = ()=>{
        dispatch(adminLogout())
        dispatch(resetAdmin())
        navigate('/') 
    }
  return (
    <header className="header">
        <div className="logo">
            <Link to='/' > GoalSetter</Link>
        </div>
        <ul>
           
           {
          user ? (
                <>
                     <li>
                        <Link to='/'>
                            <FaSignInAlt/> Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/profile'>
                            <FaSignInAlt/> Profile
                        </Link>
                    </li>
                    <li>
                        <button className={'btn'} onClick={onLogout}> 
                            <FaSignOutAlt/> Logout
                        </button>
                    </li>
                </>
            ) : (
               !admin && <>
                    <li>
                        <Link to='/register'>
                            <FaSignInAlt/> Register 
                        </Link>
                    </li>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt/> Login
                        </Link>
                    </li>
                </>
            ) 
           }


           {
            admin ? (
                <>
                    <li>
                        <Link to='/'>
                            <FaSignInAlt/> Home
                        </Link>
                    </li>
                    <li>
                        <button className={'btn'} onClick={onAdminLogout}> 
                            <FaSignOutAlt/> Admin Logout
                        </button>
                    </li>
                </>
            ) : null
           }
           
        </ul>
    </header>
  )
}

export default Header
