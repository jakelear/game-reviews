import React from "react";
import styles from "./StarRating.module.scss";

function Star() {
  return <span className={styles.rating}>&#xf005;</span>;
}

function HalfStar() {
  return <span className={styles.rating}>&#xf089;</span>;
}

function StarRating(props) {
  const stars = [];
  const starCount = props.stars;
  const halfStar = starCount % 1 > 0;

  for (let i = 0; i < starCount - (starCount % 1); i++) {
    stars.push(<Star key={i} />);
  }

  return (
    <div>
      {stars}
      {halfStar && <HalfStar />}
    </div>
  );
}

export default StarRating;
