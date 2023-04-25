import React, { useState } from 'react'
import { Button, Card, Form } from "react-bootstrap"
import http from '../../lib/http'
import { useNavigate } from 'react-router-dom'

const index = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function register(e) {
    e.preventDefault()

    if (!email || !password) {
      alert('Invalid form')
      return
    }

    try {
      const body = {
        email,
        password
      }
      const res = await http.post("/login", body)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      localStorage.setItem('token', res.data.token)
      navigate("/")
      navigate(0)
    } catch(err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div className='mt-4 d-flex justify-content-center'>
      <Card style={{width: '400px'}}>
        <Card.Body>
          <h3 className='text-center mb-4'>Login to start posting blogs</h3>
          <Form onSubmit={register}>
            <Form.Group className='mb-4'>
              <Form.Label>Email Addres</Form.Label>
              <Form.Control type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit" style={{width: '100%'}}>Login</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default index