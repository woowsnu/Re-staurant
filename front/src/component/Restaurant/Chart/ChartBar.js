import React from "react";
import styles from "./ChartBar.module.css";

const ChartBar = (props) => {
  const reviewCount = props.reviews.length;
  const reviewRevisit = props.reviews.filter((el) => el.revisit === 1).length;
  
  let barFillWidth = "0%";

  if (reviewCount > 0) {
    barFillWidth = Math.round((reviewRevisit / reviewCount) * 100) + "%";
  }

  return (
    <div className={styles.chartBar}>
      <div className={styles.chartBarInner}>
        <div
          className={styles.chartBarFill}
          style={{ width: barFillWidth }}
        ></div>
      </div>
    </div>
  );
};

export default ChartBar;
