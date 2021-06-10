import {
  CircularProgress,
  Container,
  FormControl,
  GridList,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { fetchMostPopularTVs } from "../../../actions/series";
import TVShowCard from "./TVShowCard/TVShowCard";
import useStyles from "./styles";
import { getFav } from "../../../actions/favorites";
import { getWatchList } from "../../../actions/watchlist";
import { deleteCustomList, getCustomLists } from "../../../actions/customLists";

const SeriesList = ({ isSearchResult, setIsSearchResult }) => {
  const [selectedCustomList, setSelectedCustomList] = useState("");
  const series = useSelector((state) => state.series);
  const user = useSelector((state) => state.auth);
  const watchlist = useSelector((state) => state.watchlist);
  const favorites = useSelector((state) => state.favorites);
  const customLists = useSelector((state) => state.customLists);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchMostPopularTVs());
    setIsSearchResult(false);
    if (user) {
      dispatch(getFav());
      dispatch(getWatchList());
      dispatch(getCustomLists());
    }
  }, [dispatch, user]);

  const handleChangeList = (event) => {
    const { value } = event.target;
    setSelectedCustomList(value);
  };

  const handleDeleteList = (listId) => {
    setSelectedCustomList("");
    dispatch(deleteCustomList(listId));
  };

  return (
    <div className={classes.root}>
      {!series.length ? (
        <CircularProgress />
      ) : (
        <Container maxWidth="xl" className={classes.container}>
          <Typography variant="h5">
            {isSearchResult ? "Search Result🔍" : "Trending🔥"}
          </Typography>
          <GridList className={classes.gridList} cols={3}>
            {series.map((tvShow) => (
              <TVShowCard
                key={tvShow.id}
                tvShowId={tvShow.id}
                isCustomList={false}
              />
            ))}
          </GridList>
        </Container>
      )}
      {user && (
        <>
          <Container maxWidth="xl" className={classes.container}>
            <Typography variant="h5">Watchlist📌</Typography>
            <GridList className={classes.gridList} cols={3}>
              {watchlist.map((tvShowId) => (
                <TVShowCard
                  key={tvShowId}
                  tvShowId={tvShowId}
                  isCustomList={false}
                />
              ))}
            </GridList>
          </Container>
          <Container maxWidth="xl" className={classes.container}>
            <Typography variant="h5">Favorites🧡</Typography>
            <GridList className={classes.gridList} cols={3}>
              {favorites.map((tvShowId) => (
                <TVShowCard
                  key={tvShowId}
                  tvShowId={tvShowId}
                  isCustomList={false}
                />
              ))}
            </GridList>
          </Container>

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="custom-lists">Custom Lists📁</InputLabel>
            <Select
              labelId="custom-lists"
              value={selectedCustomList}
              onChange={handleChangeList}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {customLists.map((list) => (
                <MenuItem value={list._id} key={list._id}>
                  {list.listName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedCustomList !== "" && (
            <Container maxWidth="xl" className={classes.container}>
              <Typography variant="h5">
                {
                  customLists.find((list) => list._id === selectedCustomList)
                    ?.listName
                }
                <IconButton
                  style={{ color: "#fff" }}
                  onClick={() => handleDeleteList(selectedCustomList)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Typography>
              <GridList className={classes.gridList} cols={3}>
                {customLists
                  .find((list) => list._id === selectedCustomList)
                  .list.map((tvShowId) => (
                    <TVShowCard
                      key={tvShowId}
                      tvShowId={tvShowId}
                      isCustomList={true}
                      listId={selectedCustomList}
                    />
                  ))}
              </GridList>
            </Container>
          )}
        </>
      )}
    </div>
  );
};

export default SeriesList;
