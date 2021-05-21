import { useEffect, useState } from "react"

type ValuePair = [string, React.Dispatch<React.SetStateAction<string>>];

export const useLocalStorageState = (key: string, defaultValue: string): ValuePair => {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    const temp = window.localStorage.getItem(key);
    if (temp !== null) {
      setState(temp);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [state]);

  return [
    state, setState
  ];
}
