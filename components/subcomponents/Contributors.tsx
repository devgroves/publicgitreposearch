import React, { useEffect, useState } from 'react'
import Api from "../Api"

interface propTypes {
  url: URL;
  icon?: any;
}

function Contributors(props: propTypes) {
  const { url, icon } = props;
  console.log('icon :>> ', icon);
  const [count, setCount] = useState();
  useEffect(() => {
    Api.get(url).then(
      res => {
        setCount(res.data.length)
      }
    )
  })
  return (
    <div className='center'>Contributors : {count}</div>
  )
}

export default Contributors
