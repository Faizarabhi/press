import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import posts from "./posts/postsSlice";
import categories from "./category/categorySlice";
import users from "./user/userSlice";

const store = configureStore({
  reducer: {
    auth,
    posts,
    categories,
    users,
  },
});

export default store;
