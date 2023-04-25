import React from 'react'
import { Pagination as BPagination } from "react-bootstrap"

const Pagination = ({links, active, getBlogs}) => {
  return (
    <>
      <BPagination>
        {links
          .filter((_, index) => index !== 0 && index !== links.length - 1)
          .map((link, index) => {
            return (
              <BPagination.Item key={index} active={parseInt(link.label) === active} onClick={() => getBlogs(link.label)}>
                <span dangerouslySetInnerHTML={{__html: link.label}}></span>
              </BPagination.Item>
            )
          })}
      </BPagination>
    </>
  )
}

export default Pagination