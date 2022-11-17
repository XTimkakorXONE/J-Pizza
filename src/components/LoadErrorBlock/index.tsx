import React from "react";

import styles from "./LoadErrorBlock.module.scss";

export const LoadErrorBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😞</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению, данная страница не найдена
      </p>
    </div>
  );
};
