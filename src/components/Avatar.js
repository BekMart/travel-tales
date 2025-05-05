import React from "react";
import styles from "../styles/Avatar.module.css";

// Create avatar component
const Avatar = ({ src, alt, height = 45 }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt={alt}
      />
    </span>
  );
};

export default Avatar;