'use client';


import Link from 'next/link'
import './../../../scss/Login.scss'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'
import { useEffect } from 'react';
import { myAppHook } from '@/context/AppUtils';
import { useRouter } from 'next/navigation';
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


const formSchema = yup.object().shape({
  email: yup.string().required("Emai is required").email("Invalid Email value"),
  password: yup.string().required("Password is required"),
})

export default function Login() {

const router = useRouter()
const {isLoggedIn, setIsLoggedIn, setAuthToken} = myAppHook()

const {
  register,
  handleSubmit, 
  formState: {
    errors, isSubmitting,
  }
} = useForm({resolver: yupResolver(formSchema)})

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

  const onSubmit = async (formdata: any) => {
      const {email, password} = formdata
      const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if(error){
        toast.error("Invalid login details")
      } else {
        if (data.session) {
          setAuthToken(data.session.access_token)
          localStorage.setItem("access_token", data.session.access_token)
          console.log(data)
          setIsLoggedIn(true)
        }
        toast.success("User logged in successfully")
        router.push("/auth/dashboard")
      }
  }


  return (
    <section className='login'>
      <div className="container">
        <div className="login__inner">
            <h1 className='login__title'>Login</h1>
            <form action="#" className='login__form' onSubmit={handleSubmit(onSubmit)}>
              <div className="login__form-block">
                <label className='login__form-label'>Email</label>
                <input type="email" className='login__form-input' {...register("email")}/>
                <p className='login__error-message'>{errors.email?.message}</p>
              </div>
              <div className="login__form-block">
                <label className='login__form-label'>Password</label>
                <input type="password" className='login__form-input' {...register("password")}/>
                <p className='login__error-message'>{errors.password?.message}</p>
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
                  type='submit'
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
