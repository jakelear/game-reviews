import React, { useState } from "react";
import GameList from "../GameList";

function GameSearch() {
  const [filter, setFilter] = useState("skyim");

  return (
    <div>
      <input
        type="text"
        onChange={e => {
          setFilter(e.target.value);
        }}
      />
      <GameList filter={filter} />
    </div>
  );
}

export default GameSearch;
