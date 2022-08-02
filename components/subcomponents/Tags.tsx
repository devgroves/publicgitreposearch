import React ,{useEffect,useState} from 'react'
import Api from "../Api"

interface propTypes {
  url:URL;
  icon?:any;
}

function Tags(props: propTypes) {
  const {url,icon}=props;
  const [count ,setCount]=useState();
  useEffect(()=>{
    Api.get(url).then(
      res => {
        setCount(res.data.length)
      }
    ) 
  })
  return (
    <div className='center'>   Tags : {count}</div>
  )
}

export default Tags
