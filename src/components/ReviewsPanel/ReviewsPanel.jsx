import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import RadialPercentage from "../RadialPercentage";
import ReviewCard from "../ReviewCard";
import styles from "./ReviewsPanel.module.scss";

const REVIEWS = gql`
  query Reviews($id: ID!) {
    reviews(id: $id) {
      _id
      snippet
      externalUrl
      npScore
      score
      ScoreFormat {
        base
        id
        isNumeric
        isStars
        name
        scoreDisplay
        shortName
      }
      Authors {
        name
      }
      Outlet {
        name
      }
    }
  }
`;

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
      <ul className={styles.reviewCards}>
        {data.reviews.map((review, index) => {
          if (index < 3) return <ReviewCard key={review._id} review={review} />;
        })}
      </ul>
      <a className={styles.attribution} href="https://opencritic.com">
        Reviews provided by OpenCritic
      </a>
    </Fragment>
  );
}

export default ReviewsPanel;
