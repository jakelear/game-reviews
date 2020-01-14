import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import styles from "./styles.scss";

const GAMES = gql`
  query Games($filter: String!) {
    games(filter: $filter) {
      id
      name
      Reviews {
        _id
        snippet
        score
      }
    }
  }
`;

function GameList(props) {
  const { loading, error, data } = useQuery(GAMES, {
    variables: props
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.games.map(({ id, name, Reviews }) => (
    <div key={id}>
      <h1 className={styles.header}>{name}</h1>
      {Reviews.map(({ _id, snippet }) => (
        <p key={_id}>{snippet}</p>
      ))}
    </div>
  ));
}

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
