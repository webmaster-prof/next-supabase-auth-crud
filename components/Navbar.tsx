'use client';

import Link from 'next/link'
import './../scss/Header.scss'
import { myAppHook } from '@/context/AppUtils'
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Navbar = () => {

  const {isLoggedIn, setIsLoggedIn, setAuthToken} = myAppHook()

  const router = useRouter()

  const handleUserLogout = async () => {
        localStorage.removeItem("access_token")
        setIsLoggedIn(false)
        setAuthToken(null)
        await supabase.auth.signOut()
        toast.success("User logged out successfully")
        router.push("/auth/login")
  }

    return (
      <header className="header">
            <div className="container">
                 <div className="header__inner">
                    <h2 className='header__logo'>SupaNext</h2>
                    {isLoggedIn ? (
                      <ul className='header__list'>
                        <Link href="/auth/dashboard"><li className='header__list-item'><span className='header__list-link'>Dashboard</span></li></Link>
                        <Link href="/auth/profile"><li className='header__list-item'><span className='header__list-link'>Profile</span></li></Link>
                        <li className='header__list-item'>
                          <button 
                            className='header__list-link header__list-logout'
                            onClick={handleUserLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    ) : (
                      <div className="header__buttons">
                       <Link href="/"><li className='header__buttons-item'><span className='header__buttons-link'>Home</span></li></Link>
                       <Link href="/auth/login"><li className='header__buttons-item'><span className='header__buttons-link'>Login</span></li></Link>
                      </div>
                    )}
                 </div>
            </div>
      </header>
    )
  }
  
  export default Navbar
