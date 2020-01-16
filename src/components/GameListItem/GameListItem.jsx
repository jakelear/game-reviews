import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import styles from "./GameListItem.module.scss";

function GameListItem(props) {
  const { id, name, bannerScreenshot, Companies } = props.game;

  return (
    <li className={styles.wrapper}>
      <Link
        to={{
          pathname: `/game/${id}`,
          game: props.game
        }}
      >
        <div className={styles.imgWrap}>
          <img
            src={bannerScreenshot.fullRes}
            alt={`Logo key art for ${name}`}
          />
        </div>
        <div className={styles.meta}>
          <h1 className={styles.gameTitle}>{name}</h1>
          <p className={styles.companies}>
            {Companies.map((company, index) => {
              return `${company.name} ${
                index !== Companies.length - 1 ? "| " : ""
              }`;
            })}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default withRouter(GameListItem);
