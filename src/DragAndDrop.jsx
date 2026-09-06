import { useState } from "react";

export default function DragAndDrop() {
  const [items, setItems] = useState([
    "React",
    "Redux",
    "Typescript",
    "CSS",
    "HTML",
  ]);

  const[dragIndex,setDragIndex]=useState(null)

  const handleDragStart=(dragStartIndex)=>{
    setDragIndex(dragStartIndex)
  }

  const handleDrop=(dropIndex)=>{
    const newItems=[...items];
    const draggedItem=newItems.splice(dragIndex,1)[0];
    newItems.splice(dropIndex,0,draggedItem);
    setItems(newItems);
    setDragIndex(null)
  }
  return (
    <div>
      <div>
        {items.map((res, index) => (
          <div
            style={{
              border: "1px solid blue",
              diaplay: "flex",
              padding: "10px",
              margin: "10px",
              cursor: "grab",
            }}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            draggable
          >
            <p>{res}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
