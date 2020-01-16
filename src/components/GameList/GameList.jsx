import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import GameListItem from "../GameListItem";
import styles from "./GameList.module.scss";

const GAMES = gql`
  query Games($filter: String!) {
    games(filter: $filter) {
      bannerScreenshot {
        fullRes
      }
      id
      name
    }
  }
`;

function GameList(props) {
  const { loading, error, data } = useQuery(GAMES, {
    variables: props
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul className={styles.list}>
      {data.games.map(game => (
        <GameListItem key={game.id} game={game} />
      ))}
    </ul>
  );
}

export default GameList;
