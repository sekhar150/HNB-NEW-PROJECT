import { useEffect, useState } from "react";
import useDebounce from "./Components/useDebounce";

export default function ToDoList() {
  const [data, setData] = useState([]);
  const [skipCount, setSkipCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const itemsPerPage = 30;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginationData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const debouncedSearch = useDebounce(searchValue,1000);

  useEffect(() => {
    if (debouncedSearch) {
      alert(JSON.stringify(searchValue));
    }
  }, [debouncedSearch]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_limit=500`,
      );
      const item = await response.json();
      setData(item);
    } catch (error) {
      console.log("Error");
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  //   const handleSkip = () => {
  //     const newItems=[...data]
  //     setData((prevData)=>[...prevData,...newItems])
  //     setSkipCount((prevCount) => prevCount + 10);
  //   };

  const handleSkip = () => {
    // setData((prev) => prev.filter((_, index) => index >= 10));
    setData((prevData) => prevData.slice(10));
    setPage(1);
  };
  return (
    <div>
      <input
        placeholder="Enter search value"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <p>This is todo list page</p>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={handleSkip}>Skip</button>
      <button onClick={handleNext}>Next</button>
      <button onClick={handlePrevious}>Previous</button>
      {paginationData.map((res, i) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <p>{res.id}</p>
          <p>{res.name}</p>
          <p>{res.email}</p>
        </div>
      ))}
    </div>
  );
}
