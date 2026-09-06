import { useState } from "react";

// type FlightOption = {
//   label: string;
//   value: string;
//   date?: string | undefined;
//   depDate?: string | undefined;
//   arrivalDate?: string | undefined;
// };

export function Flight() {
  const [selectedOption, setSelectedOption] = useState("");
  const [dateValue, setDateValue] = useState({})
  const options= [
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
    setSelectedOption(value);
    const result = options.find((res) => res.value === value);
    setDateValue(result);
    // if(!result){
    //     setDateValue(undefined);
    //     return;
    // }else if(value == 'oneWayFlight'){
    //     setDateValue({date:result.date})
    // }
  };
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
      {selectedOption == 'oneWayFlight'}{
        <input placeholder="Enter date" value={dateValue?.date} onChange={handleChange} />
      }
    </div>
  );
}
