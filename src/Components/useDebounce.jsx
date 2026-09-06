import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState('');
  useEffect(() => {
    const newValue = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(newValue);
  }, [value, delay]);
  return debouncedValue;
}
