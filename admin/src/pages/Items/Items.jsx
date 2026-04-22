import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from "axios"

const Items = () => {

    const [data, setData] = useState(null);

    useEffect(()=> {
        axios.get("http://localhost:4000/items")
            .then(res => setData(res.data))
            .catch(error => console.error(error))
    },[])

  return (
    <div>
      <h1>Items</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Items
