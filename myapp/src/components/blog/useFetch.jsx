import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch the Data!");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(false);
      });
  }, [url]);

  return { data, isloading, error };
};

export default useFetch;
