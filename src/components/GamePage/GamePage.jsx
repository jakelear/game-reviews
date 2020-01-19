import React from "react";
import { withRouter } from "react-router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import GAMEQUERY from "../../shared/gamefields";
import ReviewsPanel from "../ReviewsPanel";
import styles from "./GamePage.module.scss";

const GAME = gql`
  query Game($id: ID!) {
    game(id: $id) {
      ${GAMEQUERY}
    }
  }
`;

function getGame(props) {
  // We queried game for the list so we can use passed props if the user clicks through
  if (props.location.game) {
    return {
      error: false,
      loading: false,
      data: {
        game: props.location.game
      }
    };
  } else {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GAME, {
      variables: { id: id }
    });

    return {
      error,
      loading,
      data
    };
  }
}

function GamePage(props) {
  const game = getGame(props);

  if (game.loading) return <p>Loading...</p>;
  if (game.error) return <p>Error :(</p>;

  const { name, mastheadScreenshot, Companies } = game.data.game;
  return (
    <div>
      {mastheadScreenshot && (
        <img
          className={styles.masthead}
          src={mastheadScreenshot.fullRes}
          alt={`Key art for ${name}`}
        />
      )}
      <h1>{name}</h1>
      <p>
        {Companies.map((company, index) => {
          return `${company.name} ${
            index !== Companies.length - 1 ? "| " : ""
          }`;
        })}
      </p>
      <ReviewsPanel {...game.data.game} />
    </div>
  );
}

export default withRouter(GamePage);
