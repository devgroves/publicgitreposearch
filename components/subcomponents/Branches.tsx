import React, { useEffect, useState } from 'react'
import Api from "../Api"

interface propTypes {
  repo: string;
}

function Branches(props: propTypes) {
  const { repo } = props;
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("repo name ", repo, count);
    if (repo) {
      fetch(`/api/branchcount?repo=${repo}`).then((res) => res.json()).then(res => {
        const branch_count = res.data;
        setCount(branch_count);
      }).catch((err:any)=>{
        setCount(0);
        console.log('err :>> ', err);
      })
    } else {
      setCount(0);
    }
  }, [repo, count])
  return (
    <div className='center'>  Branches : {count}</div>
  )
}

export default Branches
