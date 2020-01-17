import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import styles from "./ReviewsPanel.module.scss";

const RADIUS = 54;
const DASH_ARRAY = 2 * Math.PI * RADIUS;

function calculateDashOffset(percent) {
  return DASH_ARRAY * (1.0 - percent);
}

const REVIEWS = gql`
  query Reviews($id: ID!) {
    reviews(id: $id) {
      _id
      snippet
    }
  }
`;

function RadialPercentage(props) {
  const { percentRecommended } = props;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="#333333"
        strokeWidth="6"
      />
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="#f8cb46"
        strokeWidth="6"
        strokeDasharray={DASH_ARRAY}
        strokeDashoffset={calculateDashOffset(percentRecommended / 100)}
      />
    </svg>
  );
}

function ReviewsPanel(props) {
  const { id, percentRecommended } = props;
  const { loading, error, data } = useQuery(REVIEWS, {
    variables: { id: id }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Fragment>
      <div className={styles.percentIndicator}>
        <div className={styles.percentBadge}>
          <p className={styles.percentage}>{Math.floor(percentRecommended)}%</p>
          <RadialPercentage percentRecommended={percentRecommended} />
        </div>
        <p className={styles.criticCount}>
          of {data.reviews.length} critics recommend
        </p>
      </div>
      <ul>
        {data.reviews.map((review, index) => {
          if (index < 3) return <p key={review._id}>{review.snippet}</p>;
        })}
      </ul>
    </Fragment>
  );
}

export default ReviewsPanel;
