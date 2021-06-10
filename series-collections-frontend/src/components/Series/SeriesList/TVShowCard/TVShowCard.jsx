import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import { getSeries } from "../../../../API/imdb";
import { useDispatch, useSelector } from "react-redux";
import { updateFav } from "../../../../actions/favorites";
import useStyles from "./styles";
import { updateWatchList } from "../../../../actions/watchlist";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { updateCustomList } from "../../../../actions/customLists";

const TVShowCard = ({ tvShowId, isCustomList, listId }) => {
  const classes = useStyles();
  const [tvShow, setTvShow] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites);
  const watchlist = useSelector((state) => state.watchlist);
  const customLists = useSelector((state) => state.customLists);

  const fetchData = async () => {
    const { data } = await getSeries(tvShowId);
    setTvShow(data);
  };

  useEffect(() => {
    fetchData();
  }, [tvShowId]);

  const isExist = (list) => {
    if (tvShow.id) {
      const id = tvShow.id.toString();
      const index = list.findIndex((item) => item === id);
      if (index > -1) {
        return true;
      }
    }
    return false;
  };

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddClose = () => {
    setAnchorEl(null);
  };

  const handleAddToList = (listId) => {
    handleAddClose();
    dispatch(updateCustomList(listId, tvShowId));
  };

  const handleRemoveFromList = (listId) => {
    dispatch(updateCustomList(listId, tvShowId));
  };

  return (
    <Paper elevation={3} variant="outlined" className={classes.root}>
      <Typography variant="h6">{tvShow?.original_name}</Typography>
      {tvShow.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${tvShow?.poster_path}`}
          alt="Poster"
          className={classes.poster}
        />
      )}
      <Typography variant="body1">{tvShow?.first_air_date}</Typography>
      <Typography variant="body1">{tvShow?.original_language}</Typography>
      <Typography variant="body2">{tvShow?.vote_average} ⭐</Typography>
      <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
          width={50}
          alt="tmdb logo"
          className={classes.logo}
        />
      </a>
      {user && (
        <div className={classes.cardActionArea}>
          <IconButton onClick={() => dispatch(updateFav(tvShow.id))}>
            <FavoriteIcon
              color={isExist(favorites) ? "secondary" : "disabled"}
              fontSize="large"
            />
          </IconButton>
          {!isCustomList ? (
            <IconButton
              aria-controls="add-to-list"
              aria-haspopup="true"
              onClick={handleAddClick}
            >
              <AddIcon color="secondary" fontSize="large" />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleRemoveFromList(listId)}>
              <RemoveIcon color="secondary" fontSize="large" />
            </IconButton>
          )}
          <IconButton onClick={() => dispatch(updateWatchList(tvShow.id))}>
            <BookmarksIcon
              color={isExist(watchlist) ? "secondary" : "disabled"}
              fontSize="large"
            />
          </IconButton>
        </div>
      )}
      <Menu
        id="add-to-list"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleAddClose}
      >
        {customLists.map((customList) =>
          !isExist(customList.list) ? (
            <MenuItem
              onClick={() => handleAddToList(customList._id)}
              key={customList._id}
            >
              {customList.listName}
            </MenuItem>
          ) : null
        )}
      </Menu>
    </Paper>
  );
};

export default TVShowCard;
