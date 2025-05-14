'use client';


import Link from 'next/link'
import './../../../scss/Login.scss'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'
import { useEffect } from 'react';
import { myAppHook } from '@/context/AppUtils';
import { useRouter } from 'next/navigation';

export default function Login() {

const router = useRouter()
const {isLoggedIn} = myAppHook()

useEffect(() => {
    if(isLoggedIn){
      router.push("/auth/dashboard")
      return
    }
}, [isLoggedIn])

  const handleSocialAuth =  async (provider: "google" | "github") => {
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/dashboard`
        }
      })

      if(error){
         toast.error("Failed to login via Social Oauth")
      }
  }


  return (
    <section className='login'>
      <div className="container">
        <div className="login__inner">
            <h1 className='login__title'>Login</h1>
            <form action="#" className='login__form'>
              <div className="login__form-block">
                <label className='login__form-label'>Email</label>
                <input type="email" className='login__form-input'/>
              </div>
              <div className="login__form-block">
                <label className='login__form-label'>Password</label>
                <input type="password" className='login__form-input'/>
              </div>
              <button className='form__button'>Login</button>
            </form>
            <div className="login__buttons">
               <button 
                  className='login__buttons-button button-red'
                  onClick={() => handleSocialAuth("google")}
               >
                Google
               </button>
               <button 
                  className='login__buttons-button button-black'
                  onClick={() => handleSocialAuth("github")}
                >
                  GitHub
                </button>
            </div>
            <div className="login__register">
                <p>Dont have an accounts?</p>
                <Link href="/auth/register"><span>Register</span></Link>
            </div>
        </div>
      </div>
    </section>
  )
}
