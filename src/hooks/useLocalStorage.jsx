import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue = []) => {
  //useState for gettin value if there is any otherwise setting a empty array
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key) || "[]";

    return item ? JSON.parse(item) : defaultValue;
  });

  useEffect(() => {
    //if value is undefined do nothing
    if (typeof value === undefined) {
      return;
    }

    //setting value in localStorage and key wich are passed from somewhere when using useLocalStorage hook
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return { value, setValue };
};

export default useLocalStorage;
