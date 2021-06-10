import { AUTH, LOGOUT } from "../constants";
const auth = (state = null, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("user", JSON.stringify(action?.payload));
      return action?.payload;
    case LOGOUT:
      localStorage.clear();
      return null;
    default:
      return state;
  }
};

export default auth;
