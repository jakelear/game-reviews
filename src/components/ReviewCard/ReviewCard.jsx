import React from "react";
import StarRating from "../StarRating";
import styles from "./ReviewCard.module.scss";

function ReviewCard(props) {
  const {
    snippet,
    Outlet,
    npScore,
    score,
    Authors,
    ScoreFormat,
    externalUrl
  } = props.review;

  function Score() {
    console.log(score, ScoreFormat);
    const { shortName, scoreDisplay, base } = ScoreFormat;
    const recommended = npScore === 100;
    if (!ScoreFormat.isNumeric) {
      if (ScoreFormat.shortName === "No Verdict") return "No Verdict";
      return (
        <p className={styles.score}>
          {recommended ? "Recommended" : "Not recommended"}
        </p>
      );
    }

    if (ScoreFormat.isStars) {
      const starCount = (score / base).toFixed(1);
      return <StarRating stars={starCount} />;
    }

    // OpenCritic has lots of ScoreFormats for numeric scores
    // This maps the most common of them to the correct output
    switch (shortName) {
      case "x.x / 10.0":
        return (
          <p className={styles.score}>
            {`${(score / 10).toFixed(1)} ${scoreDisplay}`}
          </p>
        );
      case "x / 10":
        return <p className={styles.score}>{`${score} ${scoreDisplay}`}</p>;

      default:
        return <p className={styles.score}>{`${score} ${scoreDisplay}`}</p>;
    }
  }

  return (
    <li className={styles.card}>
      <header className={styles.header}>
        <h1>{Outlet.name}</h1>
        <p className={styles.authors}>
          {Authors.length > 0 && "by"}
          {Authors.map((author, index) => {
            return ` ${author.name} ${
              index !== Authors.length - 1 ? "& " : ""
            }`;
          })}
        </p>
      </header>
      <Score />
      <p className={styles.snippet}>&quot;{snippet}&quot;</p>
      <a href={externalUrl} className={styles.externalLink}>
        Read full review
      </a>
    </li>
  );
}

export default ReviewCard;
