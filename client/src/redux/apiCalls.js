import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import axios from "axios";

export const login = async (dispatch, user) => {
  // dispatch loginStart first
  dispatch(loginStart());

  // try-catch block needed for api call
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      user
    );

    // dispatch loginSuccess if OK
    dispatch(loginSuccess(response.data));
  } catch (error) {
    // dispatch loginFailure if there is Error
    dispatch(loginFailure());
  }
};
