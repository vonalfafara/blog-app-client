import React from 'react'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from '../../lib/http'
import { format } from 'date-fns'

const index = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState()

  async function getBlog() {
    const res = await http.get(`/blogs/${id}`)
    setBlog(res.data)
  }

  useEffect(() => {
    getBlog()
    return
  }, [])

  return (
    <div>
      {blog && 
        (
          <>
            <img src={`${import.meta.env.VITE_API}/image/${blog.image}`} className='mb-4' style={{height: '250px', width: '100%', objectFit: 'cover', objectPosition: '0 25%'}} alt="" />
            <div className='text-center mb-4'>
              <h3>{blog.title}</h3>
              <p style={{fontSize: '.6rem'}}><b>By {blog.user?.name}</b> | <span>{format(new Date(blog.created_at), 'MMMM dd, yyyy')}</span></p>
            </div>
            <p>{blog.body}</p>
          </>
        )
      }
    </div>
  )
}

export default index