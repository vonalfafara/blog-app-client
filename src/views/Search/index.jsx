import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import http from '../../lib/http'
import Blog from "../../components/Blog"
import Pagination from "../../components/Pagination"

const index = () => {
  const [blogs, setBlogs] = useState([])
  const [meta, setMeta] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [order, setOrder] = useState("desc")

  async function getBlogs(page = 1) {
    const url = `/blogs/search?page=${page}&term=${searchTerm}&order=${order}`
    const res = await http.get(url)
    setBlogs(res.data.data)
    setMeta(res.data.meta)
    console.log(res.data.meta)
  }

  async function search(e) {
    e.preventDefault()
    getBlogs(1)
  }

  useEffect(() => {
    getBlogs()
    return
  }, [])

  return (
    <div className='mt-4'>
      <Form onSubmit={search}>
        <Form.Group className='mb-2'>
          <Form.Label>Search Title</Form.Label>
          <Form.Control type="text" placeholder="Search title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Order</Form.Label>
          <div>
            <Form.Check
              inline
              label="Descending"
              name="order"
              type="radio"
              id="desc"
              value={order}
              onChange={(e) => setOrder(e.target.id)}
            />
            <Form.Check
              inline
              label="Ascending"
              name="order"
              type="radio"
              id="asc"
              value={order}
              onChange={(e) => setOrder(e.target.id)}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit">Search</Button>
        </Form.Group>
      </Form>
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