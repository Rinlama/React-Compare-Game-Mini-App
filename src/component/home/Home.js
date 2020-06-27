import React, { useEffect, useState, useRef } from "react";
import Game from "./Game/Game";
import gamesData from "../../services/data";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [compareIndex, setCompareIndex] = useState(1);

  const [games, setGames] = useState([
    {
      id: "",
      name: "",
      cover_image: "",
    },
  ]);

  const kipiRef = useRef([]);
  const [kpi, setKpi] = useState([]);

  useEffect(() => {
    compare();
  }, [currentIndex, compareIndex]);

  const compare = () => {
    if (currentIndex === gamesData.length - 1) {
      return setGames([]);
    }

    const compare_array = gamesData.filter((d, i) => {
      if (currentIndex === i || compareIndex == i) {
        return d;
      }
    });
    setGames(compare_array);
  };

  const next = (d) => {
    const found = kipiRef.current.filter((e, i) => {
      if (e.id === d.id) {
        return { id: d.id, name: d.name, value: d.value, index: i };
      }
    })[0];

    if (!found) {
      kipiRef.current.push({ id: d.id, name: d.name, value: 1 });
    } else {
      const newkpiRef = kipiRef.current.map((md) => {
        if (md.id === found.id) {
          md = {
            id: found.id,
            name: found.name,
            value: found.value + 1,
          };
        }
        return md;
      });
      kipiRef.current = newkpiRef;
    }

    const sortKPI = kipiRef.current.sort((a, b) =>
      a.value > b.value ? 1 : -1
    );

    setKpi(sortKPI.reverse());

    if (compareIndex >= 0 && compareIndex <= gamesData.length - 2) {
      setCompareIndex((d) => d + 1);
    } else {
      setCurrentIndex((d) => d + 1);
      setCompareIndex(currentIndex + 2);
    }
  };

  return (
    <div>
      <div className="row">
        {games.length === 0 ? (
          <div className="col">
            <ul className="list-group my-1">
              {kpi.map((d) => (
                <li key={d.id} className="list-group-item">
                  {d.name} - {d.value}
                </li>
              ))}
            </ul>
            <button
              className="btn btn-primary btn-sm my-1"
              onClick={() => {
                setCompareIndex(1);
                setCurrentIndex(0);
                kipiRef.current = [];
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
            <Game game={d} next={next} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
