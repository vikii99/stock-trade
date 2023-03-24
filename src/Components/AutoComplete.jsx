import { useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

export const AutoComplete = () => {
  const{addStock} = useContext(WatchListContext)
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const renderDropdown = () => {
    const dropdownClass = search ? "show" : null;
    return (
      <ul
        style={{ height: "500px", overflowY: "scroll", overflowX: "hidden", cursor: "pointer" }}
        className={`dropdown-menu ${dropdownClass}`}
      >
        {results.map((result) => {
          return (
            <li onClick={() => {addStock(result.symbol); setSearch('')}} key={result.symbol} className="dropdown-item">
              {result.description} ({result.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [search]);
  return (
    <div className="w-50 p-5 mx-auto rounded">
      <div className="form-floating dropdown">
        <input
          id="search"
          type="text"
          style={{ backgroundColor: "rgba(145,158,171,0.3)" }}
          className="form-control"
          placeholder="search"
          autoComplete="off"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};
