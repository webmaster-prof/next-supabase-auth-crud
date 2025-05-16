"use client";


import './../../../scss/Profile.scss'
import { myAppHook } from '@/context/AppUtils'

export default function Profile() {
const {userFrofile} = myAppHook()

  return (
    <>
    {userFrofile ? (
      <section className='profile'>
        <div className="container">
          <div className="profile__inner">
              <h1 className='profile__title'>Profile</h1>
              <div className="profile__content">
                <p className='profile__content-name'>Name: <span>{userFrofile?.name}</span></p>
                <p className='profile__content-name'>Email: <span>{userFrofile?.email}</span></p>
                <p className='profile__content-name'>Phone: <span>{userFrofile?.phone}</span></p>
                <p className='profile__content-name'>Gender: <span>{userFrofile?.gender}</span></p>
              </div>
          </div>
        </div>
      </section>
    ) : (
        <p className='profile__loading'>No Profile Found!</p>
    )}
    </>
  )
}


