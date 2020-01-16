import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const REVIEWS = gql`
  query Reviews($id: ID!) {
    reviews(id: $id) {
      snippet
    }
  }
`;

function ReviewsPanel(props) {
  const { id } = props;
  const { loading, error, data } = useQuery(REVIEWS, {
    variables: { id: id }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return <h1>Reviews!</h1>;
}

export default ReviewsPanel;
