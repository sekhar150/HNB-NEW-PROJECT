import { useState } from "react";
import Child from "./Child";

export default function Parent(){
    const[data,setData]=useState([]);
    const[loading,setLoading]=useState(false)
    const[childData,setChildData]=useState([])
    const fetchData=async()=>{
        try{
            setLoading(true)
            const response=await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const item=await response.json();
            setData(item)
            setLoading(false)
        }catch(error){
            console.log('Error')
        }finally{
            setLoading(false)
        }
    }
    return(
        <div>
            <button onClick={fetchData}>Fetch Parent Data</button>
        <p>This parent component displaying child data which is received through callback</p>
         <Child data={data} onSendData={(item)=>setChildData(item)} />
            {childData.map((res,i)=>(
                <div key={i}>
                    <p>{res.id}</p>
                    <p>{res.name}</p>
                    <p>{res.email}</p>
                </div>
            ))}
        </div>
    )
}