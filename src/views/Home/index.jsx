import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import http from '../../lib/http'
import Blog from "../../components/Blog"
import Pagination from "../../components/Pagination"

const index = () => {
  const [blogs, setBlogs] = useState([])
  const [meta, setMeta] = useState({})

  async function getBlogs(page = 1) {
    const url = `/blogs?page=${page}`
    const res = await http.get(url)
    setBlogs(res.data.data)
    setMeta(res.data.meta)
    console.log(res.data.meta)
  }

  useEffect(() => {
    getBlogs()
    return
  }, [])

  return (
    <div className='mt-4'>
      <h3>The place for bloggerz to share</h3>
      <Container className='my-4'>
        {blogs.map((blog, index) => {
          return (
            <Row key={index} className='mb-4'>
              <Col>
                <Blog id={blog.id} title={blog.title} author={blog.user.name} dateCreated={blog.created_at} subtitle={blog.subtitle} />
              </Col>
            </Row>
          )
        })}
        <Row>
          <Col>
            {
              meta.links && <Pagination links={meta.links} active={meta.current_page} getBlogs={getBlogs} />
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default index