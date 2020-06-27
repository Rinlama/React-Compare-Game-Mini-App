import React from "react";

function Game(props) {
  const { name, cover_image } = props.game;

  return (
    <div className="card mt-2">
      <img
        src={cover_image}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        <a
          href="#"
          className="btn btn-primary btn-sm"
          onClick={() => {
            props.next(props.game);
          }}
        >
          Like
        </a>
      </div>
    </div>
  );
}

export default Game;
