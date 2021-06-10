import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { signIn, signUp } from "../../actions/auth";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

const defaultForm = {
  username: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [isRegistered, setIsRegistered] = useState(true);
  const [formData, setFormData] = useState(defaultForm);
  const dispatch = useDispatch();

  const handleForm = () => {
    setIsRegistered(!isRegistered);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegistered) {
      dispatch(signIn(formData));
    } else {
      dispatch(signUp(formData));
    }
    setFormData(defaultForm);
  };

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6">
          {isRegistered ? "Sign In" : "Sign Up"}
        </Typography>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            type="text"
            placeholder="Username"
            fullWidth
            className={classes.input}
            autoFocus
            required
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            type="password"
            placeholder="Password"
            fullWidth
            className={classes.input}
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {!isRegistered && (
            <TextField
              type="password"
              placeholder="Confirm Password"
              fullWidth
              className={classes.input}
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            size="medium"
            fullWidth
            type="submit"
          >
            {isRegistered ? "Sign In" : "Sign Up"}
          </Button>
          <Button color="primary" fullWidth onClick={handleForm}>
            {!isRegistered
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
