import React, { useEffect, useState, useRef } from "react";
import Navbar from "../layout/Navbar";
import Game from "./game/Game";
import gamesData from "../../services/data";

function Home() {
  const [games, setGames] = useState([
    { id: "", name: "", devlopers: "", description: "", cover_image: "" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [compareIndex, setCompareIndex] = useState(1);

  const kpiRef = useRef([]);
  const [kpi, setKPI] = useState([]);

  useEffect(() => {
    compare();
  }, [currentIndex, compareIndex]);

  const compare = () => {
    if (currentIndex === gamesData.length - 1) {
      return setGames([]);
    }
    const compare_array = gamesData.filter((d, i) => {
      if (currentIndex === i || compareIndex === i) {
        return d;
      }
    });
    setGames(compare_array);
  };
  const next = (d) => {
    const found = kpiRef.current.filter((e, i) => {
      if (e.id === d.id) {
        return { id: d.id, name: d.name, value: e.value, index: i };
      }
    })[0];
    if (!found) {
      const object = { id: d.id, name: d.name, value: 1 };
      kpiRef.current.push(object);
    } else {
      const newkpiRef = kpiRef.current.map((md) => {
        if (md.id === found.id) {
          md = {
            id: found.id,
            name: found.name,
            value: found.value + 1,
          };
        }
        return md;
      });
      kpiRef.current = newkpiRef;
    }

    const sortKPI = kpiRef.current.sort((a, b) => (a.value > b.value ? 1 : -1));
    setKPI(sortKPI.reverse());
    if (compareIndex <= gamesData.length - 2 && compareIndex >= 0) {
      setCompareIndex((d) => d + 1);
    } else {
      setCurrentIndex((d) => d + 1);
      setCompareIndex(currentIndex + 1 + 1);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="my-1">
        <form className="my-2 d-flex">
          <input
            className="form-control form-control-sm"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success btn-sm ml-2" type="submit">
            Search
          </button>
        </form>
      </div>
      {/* {currentIndex},{compareIndex} */}

      <div className="row">
        {games.length === 0 ? (
          <div className="col">
            <div>
              <h5>Survey Compare Completed</h5>
              <ul className="list-group">
                {kpi.map((d) => (
                  <li className="list-group-item" key={d.id}>
                    {d.name} = {d.value}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="btn btn-primary btn-sm mt-3"
              onClick={() => {
                setCurrentIndex(0);
                setCompareIndex(1);
                kpiRef.current = [];
              }}
            >
              Do it again
            </button>
          </div>
        ) : (
          ""
        )}

        {games.map((d) => (
          <div className="col" key={d.id}>
            <div className="card">
              <img
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                src={d.cover_image}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{d.name}</h5>
                {/* <p className="card-text">{d.description}</p> */}
                <a
                  className="btn btn-primary btn-sm border-rounded text-light"
                  onClick={() => {
                    next(d);
                  }}
                >
                  Like
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
