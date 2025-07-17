import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/authSlice'
import posts from './posts/postsSlice'
import categories from './category/categorySlice'

const store = configureStore({
  reducer: {
    auth,
    posts,
    categories,
  }
})

export default store
