import './../scss/Footer.scss'

export default function Footer() {
  return (
    <footer className='footer'>
        <div className="container">
            <div className="footer__inner">
                <p className='footer__copy'>&copy; {new Date().getFullYear()} SupaNext All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  )
}
