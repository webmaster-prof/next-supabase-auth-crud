'use client';

import Image from 'next/image'
import './../../../scss/Dashboard.scss'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient';
import { myAppHook } from '@/context/AppUtils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Dashboard() {

  const [previewImage, setPreviewImage] = useState<null>(null)
  const [products, setProducts] = useState<null>(null)
  const [userId, setUserId] = useState<null>(null)

  const {setAuthToken, setIsLoggedIn, isLoggedIn} = myAppHook()

  const router = useRouter()

  useEffect(() => {
  const handleLoginSession = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error || !data.session) {
      toast.error("Failed to get user session")
      router.push('/auth/login')
      return
    }
    setAuthToken(data.session.access_token)
    setUserId(data.session.user.id)
    localStorage.setItem("access_token", data.session.access_token)
    setIsLoggedIn(true)
    toast.success("User logged in successfully")
  }

  handleLoginSession()
}, [])

  

  return (
    <section className='dashboard'>
      <div className="container">
        <div className="dashboard__inner">
          <div className="dashboard__form">
            <h1 className='dashboard__form-title'>Add Product</h1>
            <form className='dashboard__form-form'>
              <div className="dashboard__form-block">
                <label className='dashboard__form-label'>Title</label>
                <input type="text" className='dashboard__form-input'/>
              </div>
              <div className="dashboard__form-block">
                <label className='dashboard__form-label'>Content</label>
                <textarea className='dashboard__form-textarea'/>
              </div>
              <div className="dashboard__form-block">
                <label className='dashboard__form-label'>Cost</label>
                <input type="text" className='dashboard__form-input'/>
              </div>
              <div className="dashboard__form-block">
                <label className='dashboard__form-label'>Banner Image</label>
                <div className="dashboard__form-image">
                  {previewImage ? 
                    (<Image src="" width={50} height={50} alt='Previed' id="bannerPreview"/>) : ("")
                  }
                </div>
                <div className="dashboard__form-choose">
                  <input type="file" className='dashboard__input-choose' placeholder='Choose File'/>
                </div>
              </div>
              <button className="dashboard__form-button" type='submit'>Add Product</button>
            </form>
          </div>
          <div className="dashboard__table">
                <h2 className='dashboard__table-title'>Product List</h2>
                <table className='dashboard__table-table'>
                  <thead className='dashboard__table-thead'>
                    <tr>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Cost</th>
                      <th>Banner Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='dashboard__table-tbody'>
                    {products ? (
                      <tr>
                      <td>Sample Product</td>
                      <td>Sample Content</td>
                      <td>$100</td>
                      <td><Image src="" alt="Sample product"/></td>
                      <td>
                         <div className='dashboard__table-buttons'>
                             <button className='dashboard__table-button table-button--edit'>Edit</button>
                             <button className='dashboard__table-button table-button--delete'>Delete</button>
                         </div>
                      </td>
                    </tr>
                    ) : (
                          <tr>
                      <td className='dashboard__table-nofound' colSpan="5" style={{textAlign: "center"}}>No products found</td>
                    </tr>
                    )}
                  </tbody>
                </table>
          </div>
        </div>
      </div>
    </section>
  )
}
