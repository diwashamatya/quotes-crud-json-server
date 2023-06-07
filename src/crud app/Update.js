import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Update.css";

function Update() {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    id: id,
    title: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/quotes/${id}`)
      .then((res) => setInputData(res.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., show an error message or redirect to an error page
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3030/quotes/${id}`, inputData);
      alert("Data updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle the error, e.g., show an error message or redirect to an error page
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleUpdate}>
        <input
          type="number"
          disabled
          value={inputData.id}
          placeholder="Enter an ID"
          required
        />
        <input
          type="text"
          name="title"
          value={inputData.title}
          onChange={(e) =>
            setInputData((prevData) => ({
              ...prevData,
              title: e.target.value,
            }))
          }
          placeholder="Enter a Name"
          required
        />
        <textarea
          type="text"
          name="quote"
          value={inputData.quote}
          onChange={(e) =>
            setInputData((prevData) => ({
              ...prevData,
              quote: e.target.value,
            }))
          }
          placeholder="Enter a Quote"
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
