import React from "react";

const RADIUS = 54;
const DASH_ARRAY = 2 * Math.PI * RADIUS;

function calculateDashOffset(percent) {
  return DASH_ARRAY * (1.0 - percent);
}

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

export default RadialPercentage;
