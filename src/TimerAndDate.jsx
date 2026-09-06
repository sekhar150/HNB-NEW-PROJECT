import { useEffect, useState } from "react";

export default function TimerAndDate() {
  const [count, setCount] = useState(0);
  const [startCount, setStartCount] = useState(false);
  const[date,setDate]=useState(new Date())
  useEffect(() => {
    if (startCount) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 100);
      return () => clearInterval(timer);
    }else{
        const newTimer=setInterval(()=>{
            setDate(new Date())
        },100)
        return(()=>clearInterval(newTimer))
    }
  }, [startCount]);

  const handleStart = () => {
    setStartCount(true);
  };
  const handlePause = () => {
    setStartCount(false);
  };
  const handleReset = () => {
    setCount(0);
  };
  return (
   <div>
     <div>
      <p>This timer function</p>
      <button onClick={handleStart}>Start</button>
      <p>{count}</p>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
    <div>
        <p>This is the date function</p>
        <p>{date.toLocaleDateString()}</p>--<p>{date.toLocaleTimeString()}</p>
    </div>
   </div>
  );
}
