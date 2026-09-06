import { useEffect, useState } from "react";

export function Flight() {
  const [selectedOption, setSelectedOptions] = useState("");
  const [dateValue, setDateValue] = useState({});
  const [newData, setNewData] = useState([]);
  const [loading,setLoading]=useState(false)
  const options = [
    { label: "Select Option", value: "" },
    { label: "One Way Flight", value: "oneWayFlight", date: "06/09/2026" },
    {
      label: "Two Way Flight",
      value: "twoWayFlight",
      depDate: "06/09/2026",
      arrivalDate: "12/09/2026",
    },
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(value);
    const result = options.find((res) => res.value == value);
    setDateValue(result);
    if (value == "oneWayFlight") {
      setDateValue({ date: result.date });
    } else if (value == "twoWayFlight") {
      setDateValue({
        depDate: result.depDate,
        arrivalDate: result.arrivalDate,
      });
    } else {
      setDateValue({});
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url =
        selectedOption === "oneWayFlight"
          ? "https://jsonplaceholder.typicode.com/posts"
          : "https://jsonplaceholder.typicode.com/users";
      try {
        setLoading(true)
        const response = await fetch(url);
        const data = await response.json();
        if(selectedOption !== ''){
        setNewData(data)
      }
      setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log("Error");
      }
    };
    fetchData();
  },[selectedOption]);

  return (
    <div>
      <div>
        <select value={selectedOption} onChange={handleChange}>
          {options.map((res, i) => (
            <option key={i} value={res.value}>
              {res.label}
            </option>
          ))}
        </select>
      </div>
      {selectedOption == "oneWayFlight" ? (
        <input
          placeholder="Enter Date"
          value={dateValue.date}
          onChange={(e) => setDateValue("date", e.target.value)}
        />
      ) : selectedOption == "twoWayFlight" ? (
        <>
          <input
            placeholder="Enter departure"
            value={dateValue.depDate}
            onChange={(e) => setDateValue("depDate", e.target.value)}
          />
          <input
            placeholder="Enter arrival"
            value={dateValue.arrivalDate}
            onChange={(e) => setDateValue("arrivalDate", e.target.value)}
          />
        </>
      ) : null}
      {newData.map((res, i) => (
        <div key={i} >
          {selectedOption == "oneWayFlight" ? (
            <div style={{display:'flex',justifyContent:"space-between"}}>
              <p>{res.id}</p>
              <p>{res.title}</p>
              <p>{res.body}</p>
            </div>
          ) : (
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <p>{res.id}</p>
              <p>{res.name}</p>
              <p>{res.email}</p>
            </div>
          )}
        </div>
      ))}
      {loading && <p>Data is loading.....</p>}
    </div>
  );
}
