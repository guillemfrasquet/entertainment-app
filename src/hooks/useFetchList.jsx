import { useEffect, useState } from "react";

const useFetchList = (url, token) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => setData(data.results))
    .catch(err => console.error(err));
  }, [url, token]);

  return data;
};

export default useFetchList;