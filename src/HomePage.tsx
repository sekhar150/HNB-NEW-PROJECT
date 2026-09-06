import { useState, type ChangeEvent } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function HomePage() {
  const [data, setData] = useState<Post[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editBody, setEditBody] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
   const filteredData = data.filter((res) =>
    String(res.id).includes(searchValue),
  );


  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginationData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handleClick = async () => {
    try {
      console.log("Button clicked!");
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`,
      );
      const item = await response.json();
      setData(item);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = () => {
    setData((prev) => [
      ...prev,
      { id: data.length + 1, title: editTitle, body: editBody },
    ]);
    setEditTitle("");
    setEditBody("");
  };

  const handleEdit = (id: number) => {
    if (!editId) {
      const editData = data.find((res) => res.id == id);
      setEditTitle(editData?.title || "");
      setEditBody(editData?.body || "");
      setEditId(id);
    } else {
      const updatedData = data.map((res) =>
        res.id == editId ? { ...res, title: editTitle, body: editBody } : res,
      );
      setData(updatedData);
      setEditId(null);
      setEditTitle("");
      setEditBody("");
    }
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((res) => res.id !== id));
  };

  const handleDeleteAll = () => {
    setData([]);
  };

const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setPage(1)
}
  return (
    <div>
      {data.length === 0 && <button onClick={handleClick}>Fetch Data</button>}
      {data.length > 0 && <button onClick={handleDeleteAll}>Delete All</button>}
      <input
        placeholder="Search by"
        value={searchValue}
        onChange={handleSearch}
      />
      <input
        placeholder="Edit title"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <input
        placeholder="Edit body"
        value={editBody}
        onChange={(e) => setEditBody(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      {data.length > 0 && (
        <table border={1}>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            {paginationData.map((res, i) => (
              <tr key={i}>
                <td>{res.id}</td>
                <td>{res.title}</td>
                <td>{res.body}</td>
                <button onClick={() => handleEdit(res.id)}>Edit</button>
                <button onClick={() => handleDelete(res.id)}>Delete</button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {paginationButtons.map((num)=>(
        <button key={num} onClick={()=>setPage(num)}>{num}</button>
      ))}
    </div>
  );
}
