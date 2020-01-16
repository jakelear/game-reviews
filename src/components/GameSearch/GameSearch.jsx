import React, { Fragment, useState } from "react";
import GameList from "../GameList";
import styles from "./GameSearch.module.scss";

function GameSearch() {
  const [filter, setFilter] = useState("");

  return (
    <Fragment>
      <div className={styles.searchWrapper}>
        <form className={styles.form}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            onChange={e => {
              setFilter(e.target.value);
            }}
          />
        </form>
      </div>
      <GameList filter={filter} />
    </Fragment>
  );
}

export default GameSearch;
