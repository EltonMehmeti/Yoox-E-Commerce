import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Personi = () => {
  const [bankaTable, setBankaTable] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/banka/getBanka").then((response) => {
      setBankaTable(response.data);
    });
  }, []);
  const [name, setName] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [bankaId, setBankaId] = useState(null);
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          onChange={(e) => {
            setMbiemri(e.target.value);
          }}
        />
        <select onChange={(e) => setBankaId(e.target.value.split("-")[0])}>
          {bankaTable?.map((banka, i) => {
            return (
              <option>
                {banka.Id58249}-{banka.Emri58249}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Personi;
