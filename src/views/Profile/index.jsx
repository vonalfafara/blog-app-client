import React, { useState, useEffect } from 'react'
import { Col, Row } from "react-bootstrap"
import http from '../../lib/http'
import Blog from "../../components/Blog"
import Pagination from "../../components/Pagination"

const index = () => {
  const [user, _] = useState(JSON.parse(localStorage.getItem('user')))
  const [blogs, setBlogs] = useState([])
  const [meta, setMeta] = useState({})

  async function getUserBlogs(page = 1) {
    const res = await http.get(`/blogs/user/${user.id}?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    setBlogs(res.data.data)
    setMeta(res.data.meta)
  }
  useEffect(() => {
    getUserBlogs()
    return
  }, [])
  
  return (
    <div className='mt-4'>
      { user && 
        (
          <>
            <Row className="mb-4 d-flex justify-content-center">
              <Col className='text-center text-md-end mb-4 mb-md-0'>
                <img style={{height: '300px', width: '300px', borderRadius: '100%', objectFit: 'cover'}} src={`${import.meta.env.VITE_API}/image/${user.profile_picture}`} alt="" />
              </Col>
              <Col className='text-center text-md-start d-flex flex-column justify-content-center'>
                <h3>{user.name}</h3>
                <h5>{user.email}</h5>
              </Col>
            </Row>
            {blogs.map((blog, index) => {
              return (
                <Row key={index} className='mb-4'>
                  <Col>
                    <Blog id={blog.id} title={blog.title} author={blog.user?.name} dateCreated={blog.created_at} subtitle={blog.subtitle} />
                  </Col>
                </Row>
              )
            })}
            <Row>
              <Col>
                {
                  meta.links && <Pagination links={meta.links} active={meta.current_page} getBlogs={getUserBlogs} />
                }
              </Col>
            </Row>
          </>
        )
      }
    </div>
  )
}

export default index