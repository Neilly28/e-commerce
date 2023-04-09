import { createSlice } from "@reduxjs/toolkit";

// create Slice
const userSlice = createSlice({
  // create name
  name: "user",

  //   create initial state
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },

  //   create reducers
  reducers: {
    loginStart: (state, action) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },

    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

// export actions
export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;

// export reducer
export default userSlice.reducer;
