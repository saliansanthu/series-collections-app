import {
  AppBar,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSeries } from "../../actions/series";
import useStyles from "./styles";
import { createCustomList } from "../../actions/customLists";

const Footer = ({ setIsSearchResult }) => {
  const [title, setTitle] = useState("");
  const [listName, setListName] = useState("");
  const classes = useStyles();
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleTitle = (event) => {
    const { value } = event.target;
    setTitle(value);
  };

  const handleListName = (event) => {
    const { value } = event.target;
    setListName(value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(searchSeries(title));
    setIsSearchResult(true);
    setTitle("");
  };

  const handleAddList = (event) => {
    event.preventDefault();
    dispatch(createCustomList({ listName }));
    setListName("");
  };

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <form
          onSubmit={handleSearch}
          className={classes.form}
          autoComplete="off"
        >
          <TextField
            value={title}
            name="title"
            onChange={handleTitle}
            required
            placeholder="Series Title"
            className={classes.input}
            InputProps={{
              style: { color: "#fff" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" style={{ color: "#fff" }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        {user && (
          <form
            onSubmit={handleAddList}
            className={classes.form}
            autoComplete="off"
          >
            <TextField
              value={listName}
              name="listName"
              onChange={handleListName}
              required
              placeholder="List Name"
              className={classes.input}
              InputProps={{
                style: { color: "#fff" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" style={{ color: "#fff" }}>
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
