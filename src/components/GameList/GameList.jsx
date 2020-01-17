import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import GameListItem from "../GameListItem";
import styles from "./GameList.module.scss";

const gameFields = `
  bannerScreenshot {
    fullRes
  }
  mastheadScreenshot {
    fullRes
  }
  id
  name
  percentRecommended
  Companies {
    name
    type
  }
`;

const SEARCH = gql`
  query Games($filter: String!) {
    games(filter: $filter) {
      ${gameFields}
    }
  }
`;

const HALL_OF_FAME = gql`
  query halloffame {
    halloffame {
      ${gameFields}
    }
  }
`;

function GameList(props) {
  const query = props.filter ? SEARCH : HALL_OF_FAME;
  const { loading, error, data } = useQuery(query, {
    variables: props
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const games = query === HALL_OF_FAME ? data.halloffame : data.games;
  return (
    <ul className={styles.list}>
      {games.map(game => (
        <GameListItem key={game.id} game={game} />
      ))}
    </ul>
  );
}

export default GameList;
