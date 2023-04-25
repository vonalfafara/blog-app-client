import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({id, title, author, dateCreated, subtitle}) => {
  return (
    <>
      <h6><Link to={`/${id}`}>{title}</Link></h6>
      <p style={{fontSize: '.6rem'}}><b>By {author}</b> | <span>{dateCreated}</span></p>
      <p style={{fontSize: '.8rem'}}>{subtitle}</p>
    </>
  )
}

export default Blog