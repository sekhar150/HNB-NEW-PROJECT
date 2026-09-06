import { useEffect, useState } from "react";

export default function InfiniteScrolling() {
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const controller = new AbortController();
    const handleFetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=30`,
          { signal: controller.signal },
        );
        const data = await response.json();
        setLoading(false)
        if (!controller.signal.aborted) {
          setNewData((prevData) => [...prevData, ...data]);
        }
        setLoading(false);
      } catch (error) {
        // if (!controller.signal.abort) {
        //   setLoading(false);
        //   console.log("Error", error);
        // }
      }
    };
    handleFetchData();
    return () => {
      controller.abort();
    };
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;
      if (bottom && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div>
      {/* <button onClick={handleFe tchData}>Fetch Data</button> */}
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {newData.map((res, i) => (
            <tr key={i}>
              <td>{res.id}</td>
              <td>{res.name}</td>
              <td>{res.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading&& newData.length>0?<p>Loading.....</p>:<p>No data to fetch</p>}
    </div>
  );
}
