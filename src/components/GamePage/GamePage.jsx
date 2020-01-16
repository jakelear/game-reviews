import React from "react";
import { withRouter } from "react-router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";

import ReviewsPanel from "../ReviewsPanel";
import styles from "./GamePage.module.scss";

const GAME = gql`
  query Game($id: ID!) {
    game(id: $id) {
      bannerScreenshot {
        fullRes
      }
      mastheadScreenshot {
        fullRes
      }
      id
      name
      Companies {
        name
        type
      }
    }
  }
`;

function getGame(props) {
  /* We queried game for the list, so only query for game on direct navigation */
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
  const results = getGame(props);

  if (results.loading) return <p>Loading...</p>;
  if (results.error) return <p>Error :(</p>;

  const { name, id, mastheadScreenshot, Companies } = results.data.game;
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
      <ReviewsPanel id={id} />
    </div>
  );
}

export default withRouter(GamePage);
