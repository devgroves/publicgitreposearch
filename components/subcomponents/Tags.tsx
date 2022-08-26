import React ,{useEffect,useState} from 'react'
import Api from "../Api"

interface propTypes {
  url:string;
  icon?:any;
}

function Tags(props: propTypes) {
  const {url,icon}=props;
  const [count ,setCount]=useState(0);
  useEffect(()=>{
    fetch(`/api/tags?url=${url}`).then((res) => res.json()).then(res => {
      const tags_count = res.data;
      setCount(tags_count);
    });
  },[url])
  return (
    <div className='center'>   Tags : {count}</div>
  )
}

export default Tags
