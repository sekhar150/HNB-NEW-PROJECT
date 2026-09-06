import { useState } from "react";

export default function Child({ data = [],onSendData=()=>{} }) {
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState([]);
  const fetchChildData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
      );
      const data = await response.json();
      setNewData(data);
      onSendData(data)
    } catch (error) {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
        <p>The child componenet displaying the parent data</p>
        <button onClick={fetchChildData}>Send Child Data To Parent</button>
      {data.map((res, i) => (
        <div key={i}>
          <p>{res.id}</p>
          <p>{res.title}</p>
          <p>{res.body}</p>
        </div>
      ))}
    </div>
  );
}
