import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      user
    );
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(loginFailure());
  }
};
