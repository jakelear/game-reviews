import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import styles from "./GameListItem.module.scss";

function GameListItem(props) {
  const { id, name, bannerScreenshot } = props.game;

  return (
    <li className={styles.wrapper}>
      <Link to={`/game/${id}`}>
        <div className={styles.imgWrap}>
          <img
            src={bannerScreenshot.fullRes}
            alt={`Logo key art for ${name}`}
          />
        </div>
        <h1>{name}</h1>
      </Link>
    </li>
  );
}

export default withRouter(GameListItem);
