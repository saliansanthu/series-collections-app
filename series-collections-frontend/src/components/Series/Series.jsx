import { Container } from "@material-ui/core";
import React from "react";
import SeriesList from "./SeriesList/SeriesList";

const Series = ({ isSearchResult, setIsSearchResult }) => {
  return (
    <Container maxWidth="xl">
      <SeriesList
        isSearchResult={isSearchResult}
        setIsSearchResult={setIsSearchResult}
      />
    </Container>
  );
};

export default Series;
