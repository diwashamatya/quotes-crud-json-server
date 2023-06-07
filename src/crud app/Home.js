import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [quotes, setQuotes] = useState([]);
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get("http://localhost:3030/quotes");
      setQuotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuote = {
        title,
        quote,
      };
      await axios.post("http://localhost:3030/quotes", newQuote);
      setTitle("");
      setQuote("");
      fetchQuotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/quotes/${id}`);
      fetchQuotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredQuotes = quotes.filter((quote) => {
    return quote.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by Title"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a Title"
          required
        />
        <textarea
          type="text"
          name="quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Enter a quote"
          rows="6"
          cols="30"
          required
        />

        <button className="btnQuote" type="submit">
          AddQuote
        </button>
      </form>

      <ul>
        {filteredQuotes.map((quote) => (
          <div className="ul" key={quote.id}>
            <h1>
              {quote.id}.{quote.title}
            </h1>
            <li>{quote.quote}</li>
            <Link to={`/update/${quote.id}`}>
              <button className="btnUp">Update</button>
            </Link>
            <button className="btnDel" onClick={() => handleDelete(quote.id)}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Home;
