import React, { useEffect, useState } from 'react'
import Api from "../Api"

interface propTypes {
  repo: string;
}

function Branches(props: propTypes) {
  const { repo } = props;
  const [count, setCount] = useState();
  useEffect(() => {
    Api.get(`https://api.github.com/repos/${repo}/branches`).then(
      res => {
        setCount(res.data.length)
      }
    ).catch((err:any)=>{
      console.log('err :>> ', err);
    })
  })
  return (
    <div className='center'>   Branches : {count}</div>
  )
}

export default Branches
