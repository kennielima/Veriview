import React from 'react'
import Homepage from './components/Homepage'

const page = async () => {
  const response = await fetch(`${process.env.API_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const Reviews = await response.json()
  console.log('Reviews:', Reviews)
  return (
    <Homepage Reviews={Reviews} />
  )
}

export default page