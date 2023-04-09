import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userSlice";

// import from ..redux or ..slice (it does not matter. follow naming convention)

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
