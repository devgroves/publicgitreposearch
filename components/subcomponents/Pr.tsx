import React, { useEffect, useState } from 'react'
import Api from "../Api"

interface propTypes {
  repo: string;
}

function PR(props: propTypes) {
  const { repo } = props;
  const [count, setCount] = useState();
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
    // Api.get(`https://api.github.com/repos/${repo}/pulls`).then(
    //   res => {
    //     setCount(res.data.length)
    //   }
    // ).catch((err: any) => {
    //   console.log('err :>> ', err);
    // })
  })
  return (
    <div className='center'>   Pull Request : {count}</div>
  )
}

export default PR
