import Link from 'next/link'
import './../../../scss/Register.scss'


export default function Register() {
  return (
    <section className='register'>
      <div className="container">
        <div className="register__inner">
            <h1 className='register__title'>Register</h1>
            <form action="#" className='register__form'>
              <div className="register__form-block">
                <label className='register__form-label'>Display Name</label>
                <input type="text" className='register__form-input'/>
              </div>
              <div className="register__form-block">
                <label className='register__form-label'>Email</label>
                <input type="email" className='register__form-input'/>
              </div>
              <div className="register__form-block">
                <label className='register__form-label'>Phone</label>
                <input type="phone" className='register__form-input'/>
              </div>
              <div className="register__form-block">
                <label className='register__form-label'>Genger</label>
                <select className='register__form-input'>
                    <option value="male">Male</option>
                    <option value="male">xuy</option>
                    <option value="male">pizda</option>
                </select>
              </div>
              <div className="register__form-block">
                <label className='register__form-label'>Password</label>
                <input type="password" className='register__form-input'/>
              </div>
              <div className="register__form-block">
                <label className='register__form-label'>Confirm Password</label>
                <input type="password" className='register__form-input'/>
              </div>
              <button className='register_form-button'>Register</button>
            </form>
            <div className="register__register">
                <p>Dont have an accounts?</p>
                <Link href="/auth/login"><span>Login</span></Link>
            </div>
        </div>
      </div>
    </section>
  )
}



