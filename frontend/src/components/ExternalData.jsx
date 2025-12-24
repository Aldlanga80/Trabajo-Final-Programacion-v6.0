import { useEffect, useState } from "react";

const ExternalData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://tu-backend.onrender.com/api/external-data")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h2>Datos externos</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExternalData;
