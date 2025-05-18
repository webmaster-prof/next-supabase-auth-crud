'use client';

import Image from 'next/image'
import './../../../scss/Dashboard.scss'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient';
import { myAppHook } from '@/context/AppUtils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';

const formSchema = yup.object().shape({
  title: yup.string().required("Product title is required"),
  content: yup.string().required("Description is required"),
  cost: yup.string().required("Product cost is required"),
})
interface ProductType {
   id?: number
   title: string
   content?: string
   cost?: string
   banner_image?: string | File | null
}
export default function Dashboard() {

  const [previewImage, setPreviewImage] = useState<null>(null)
  const [products, setProducts] = useState<ProductType[]>([])
  const [userId, setUserId] = useState<null>(null)
  const {setAuthToken, setIsLoggedIn, isLoggedIn, setUserProfile} = myAppHook()
  const router = useRouter()

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm({resolver: yupResolver(formSchema)})

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
    console.log(data)
    setIsLoggedIn(true)
    setUserProfile({
        name: data.session.user?.user_metadata.fullName,
        email: data.session.user?.user_metadata.email,
        phone: data.session.user?.user_metadata.phone,
        gender: data.session.user?.user_metadata.gender,
    })
    localStorage.setItem("user_profile", JSON.stringify({
        name: data.session.user?.user_metadata.fullName,
        email: data.session.user?.user_metadata.email,
        phone: data.session.user?.user_metadata.phone,
        gender: data.session.user?.user_metadata.gender,
    }))
    fetchProductFromTable(data.session.user.id)
  }
  handleLoginSession()
}, [])


const uploadImageFile = async (file: File) => {
     const fileExtension = file.name.split(".").pop()
     const fileName = `${Date.now()}.${fileExtension}`
     const {data, error} = await supabase.storage.from("product-images").upload(fileName, file)
     if(error){
         toast.error("Failed to upload banner image")
         return null
     }
     return supabase.storage.from("product-images").getPublicUrl(fileName).data.publicUrl
}

const onFormSubmit = async (formData: any) => {
     let imagePath = null
     if(formData.banner_image instanceof File){
        imagePath = await uploadImageFile(formData.banner_image)
        if(!imagePath) return
     }
     const {data, error} = await supabase.from("products").insert({
        ...formData,
        user_id: userId,
        banner_image: imagePath
     })
     if(error){
      toast.error("Failed to Add Product")
     } else {
      toast.success("Successfully Product has been created!")
     }
     reset()
     setPreviewImage(null)
}

 const fetchProductFromTable = async (userId: string) => {
    const {data, error} = await supabase.from("products").select("*").eq("user_id", userId)
    if(data){
      setProducts(data)
    }
 }

  return (
    <section className='dashboard'>
      <div className="container">
        <div className="dashboard__inner">
          <div className="dashboard__form">
            <h1 className='dashboard__form-title'>Add Product</h1>
            <form className='dashboard__form-form' onSubmit={handleSubmit(onFormSubmit)}>
              <div className="dashboard__form-block">
                <label className='dashboard__form-label'>Title</label>
                <input type="text" className='dashboard__form-input' {...register("title")}/>
                <span className='dashboard__form-error'>{errors.title?.message}</span>
              </div>
              <div className="dashboard__form-block">
                <label className='dashboard__form-label'>Content</label>
                <textarea className='dashboard__form-textarea' {...register("content")}/>
                <span className='dashboard__form-error'>{errors.content?.message}</span>
              </div>
              <div className="dashboard__form-block">
                <label className='dashboard__form-label'>Cost</label>
                <input type="text" className='dashboard__form-input' {...register("cost")}/>
                <span className='dashboard__form-error'>{errors.cost?.message}</span>
              </div>
              <div className="dashboard__form-block">
                <label className='dashboard__form-label'>Banner Image</label>
                <span className='dashboard__form-error'></span>
                <div className="dashboard__form-image">
                  {previewImage ? 
                    (<Image src={previewImage} width={100} height={100} alt='Previed' id="bannerPreview"/>) : ("")
                  }
                </div>
                <div className="dashboard__form-choose">
                  <input 
                    type="file" 
                    onChange={(e) => {
                      setValue("banner_image", e.target.files[0]); 
                      setPreviewImage(URL.createObjectURL(e.target.files[0]));
                    }}
                    className='dashboard__input-choose' 
                    placeholder='Choose File'
                  />
                  <span className='dashboard__form-error'></span>
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
                    {products.length > 0 ? products.map((singleProduct, index) => (
                      <tr key={index}>
                          <td>{singleProduct.title}</td>
                          <td>{singleProduct.content}</td>
                          <td>${singleProduct.cost}</td>
                          <td>
                            {singleProduct.banner_image ? (
                              <Image src={singleProduct.banner_image} width={50} height={50}  alt="Sample product"/>) : ("--")}
                          </td>
                          <td>
                            <div className='dashboard__table-buttons'>
                                <button className='dashboard__table-button table-button--edit'>Edit</button>
                                <button className='dashboard__table-button table-button--delete'>Delete</button>
                            </div>
                          </td>
                      </tr>
                      )) : (
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
