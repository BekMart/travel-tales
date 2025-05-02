import React from "react";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";
import { Container } from "react-bootstrap";
import appStyles from "../App.module.css";

const NotFound = () => {
  return (
    <>
      <h1 className={styles.Heading}>404 Error</h1>
      <Container className={appStyles.Content}>
        <div className={styles.TopMargin}>
          <Asset
            src={NoResults}
            message={
                <>
                Sorry, the page you are looking for does not exist. 
                <br /> 
                Please try again.
                </>
                }
            className={styles.Image}
          />
        </div>
      </Container>
    </>
  );
};

export default NotFound;
