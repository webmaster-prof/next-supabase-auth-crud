"use client";

import Link from 'next/link'
import './../../../scss/Register.scss'
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


// type RegisterFormData = yup.InferType<typeof formSchema>;

const formSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid Email Value").required("Email value is required"),
  phone: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gener is required").oneOf(["Male", "Female", "Other"], "Gener is not allowed"),
  password: yup.string().required("Password is required").min(6, "Password is of minimum 6 character"),
  confirm_password: yup.string().required("Confirm password is required").oneOf([yup.ref("password")], "Password didn't match")
})


export default function Register() {

 const router = useRouter()

 const {
    register, 
    handleSubmit, 
    formState: {
      errors, isSubmitting,
    }
  } = useForm({
    resolver: yupResolver(formSchema)
 })

 const onSubmit = async (formdata: any) => {
    //  console.log(formdata)
    const {fullName, email, phone, gender, password} = formdata
    const {data, error} = await supabase.auth.signUp({
        email,
        password, 
        options: {
          data: {
            fullName,
            phone,
            gender,
          }
        }
    })
    if(error){
      toast.error("Failed to register user")
    } else {
      toast.success("User registered successfully")
      router.push("/auth/login")
    }
 }


  return (
    <section className='register'>
      <div className="container">
        <div className="register__inner">
            <h1 className='register__title'>Register</h1>
            <form action="#" className='register__form' onSubmit={handleSubmit(onSubmit)}>
              <div className="register__form-block">
                <label className='register__form-label'>Display Name</label>
                <input type="text" className='register__form-input' {...register("fullName")}/>
                <p className='form__error-message'>{errors.fullName?.message}</p>
              </div>
              <div className="register__form-block">
                <label className='register__form-label'>Email</label>
                <input type="email" className='register__form-input' {...register("email")}/>
                <p className='form__error-message'>{errors.email?.message}</p>
              </div>
              <div className="register__form-block">
                <label className='register__form-label'>Phone</label>
                <input type="phone" className='register__form-input' {...register("phone")}/>
                <p className='form__error-message'>{errors.phone?.message}</p>
              </div>
              <div className="register__form-block">
                <label className='register__form-label'>Genger</label>
                <select className='register__form-input' {...register("gender")}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <p className='form__error-message'>{errors.gender?.message}</p>
              </div>
              <div className="register__form-block">
                <label className='register__form-label'>Password</label>
                <input type="password" className='register__form-input' {...register("password")}/>
                <p className='form__error-message'>{errors.password?.message}</p>
              </div>
              <div className="register__form-block">
                <label className='register__form-label'>Confirm Password</label>
                <input type="password" className='register__form-input' {...register("confirm_password")}/>
                <p className='form__error-message'>{errors.confirm_password?.message}</p>
              </div>
              <button className='register_form-button' type='submit'>Register</button>
            </form>
            <div className="register__register">
                <p>Already have an account?</p>
                <Link href="/auth/login"><span>Login</span></Link>
            </div>
        </div>
      </div>
    </section>
  )
}



