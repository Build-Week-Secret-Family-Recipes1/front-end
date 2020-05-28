import { useState } from "react";

export function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  const setValue = (value) => {
    setStoredValue(value);
    window.sessionStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
};
