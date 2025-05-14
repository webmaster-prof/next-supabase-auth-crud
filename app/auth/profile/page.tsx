import './../../../scss/Profile.scss'

export default function Profile() {
  return (
    <section className='profile'>
      <div className="container">
        <div className="profile__inner">
          <h1 className='profile__title'>Profile</h1>
          <div className="profile__content">
             <p className='profile__content-name'>Name: <span>N/a</span></p>
             <p className='profile__content-name'>Email: <span>N/a</span></p>
             <p className='profile__content-name'>Phone: <span>N/a</span></p>
             <p className='profile__content-name'>Gender: <span>N/a</span></p>
          </div>
          <p className='profile__loading'>Loading Profile...</p>
        </div>
      </div>
    </section>
  )
}
