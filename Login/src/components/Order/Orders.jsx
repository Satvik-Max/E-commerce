import "./Orders.css"
import React, { useState } from 'react'
import axios from "axios"

const Orders = (props) => {
  const [product , setproduct] = useState([])
  useEffect(() => {
    axios
    .get("http:/localhost:3001/")
    .then((res) => setproduct(res))
    .catch((err) => console.log(err))
  } , []);
  return (
    <>
      <h1> Orders Component </h1>
    </>
  )
}

export default Orders
