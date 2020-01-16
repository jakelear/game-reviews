import React from "react";
import { withRouter } from "react-router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";

const GAME = gql`
  query Game($id: ID!) {
    game(id: $id) {
      bannerScreenshot {
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

  return <p>{results.data.game.name}</p>;
}

export default withRouter(GamePage);
