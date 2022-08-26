import React, { useEffect, useState } from 'react'
import Api from "../Api"

interface propTypes {
  url: URL;
  icon?: any;
}

function Contributors(props: propTypes) {
  const { url, icon } = props;
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch(`/api/contributers?url=${url}`).then((res) => res.json()).then(res => {
      const tags_count = res.data;
      setCount(tags_count);
    });
  },[url])
  return (
    <div className='center'>Contributors : {count}</div>
  )
}

export default Contributors
