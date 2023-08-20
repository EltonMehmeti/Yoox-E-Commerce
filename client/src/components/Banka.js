import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Banka = () => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    axios
      .post("http://localhost:3001/banka/createBank", {
        name: name,
      })
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Inserted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      });
  };
  const [bankaTable, setBankaTable] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/banka/getBanka").then((response) => {
      setBankaTable(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:3001/banka/delete", {
        data: {
          id: id,
        },
      })
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Deleted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting:", error);
        // Handle error scenario here, show error message or take appropriate action
      });
  };
  const [nameU, setNameU] = useState("");
  const handleUpdate = (id) => {
    axios
      .put("http://localhost:3001/banka/update", {
        id: id,
        nameU: nameU,
      })
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-1/2">
      <input
        type="text"
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Submit</button>

      {bankaTable?.map((banka, i) => {
        return (
          <div key={i}>
            <h1>{banka.Emri58249}</h1>
            <button
              onClick={() => {
                handleDelete(banka.Id58249);
              }}
            >
              Delete
            </button>
            {/* <button
              onClick={() => {
                handleUpdate(banka.Id58249);
              }}
            >
              Update
            </button> */}
          </div>
        );
      })}
    </div>
  );
};

export default Banka;
