import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import GameListItem from "../GameListItem";
import GAMEQUERY from "../../shared/gamefields";
import styles from "./GameList.module.scss";

const SEARCH = gql`
  query Games($filter: String!) {
    games(filter: $filter) {
      ${GAMEQUERY}
    }
  }
`;

const HALL_OF_FAME = gql`
  query halloffame {
    halloffame {
      ${GAMEQUERY}
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
