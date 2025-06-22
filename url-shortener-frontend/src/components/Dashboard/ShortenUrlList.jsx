// imports libraries(classes)
import React from 'react'
// imports components
import ShortenItem from './ShortenItem'


// creates component that displays list of shorten urls
const ShortenUrlList = ({ data }) => {
  return (
    <div className='my-6 space-y-4'>
        {data.map((item) => (
            <ShortenItem key={item.id} {...item} />
        ))}
    </div>
  )
}

// exports ShortenUrlList component
export default ShortenUrlList