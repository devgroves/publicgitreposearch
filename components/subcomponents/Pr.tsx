import React, { useEffect, useState } from 'react'
import Api from "../Api"

interface propTypes {
  repo: string;
}

function PR(props: propTypes) {
  const { repo } = props;
  const [count, setCount] = useState(0);
  useEffect(() => {
      if (repo) {
        fetch(`/api/prcounts?repo=${repo}`).then((res) => res.json()).then(res => {
          const prcount = res.data;
          console.log(`pr count ${prcount}`);
          setCount(prcount);
        });
      } else {
        setCount(0);
      }
  }, [repo])
  return (
    <div className='center'>   Pull Request : {count}</div>
  )
}

export default PR
