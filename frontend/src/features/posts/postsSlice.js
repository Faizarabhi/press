import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'


export const fetchPosts = createAsyncThunk('posts/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await api.get('/posts')
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Erreur serveur')
  }
})

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/posts/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Erreur')
    }
  }
)

export const updatePost = createAsyncThunk('posts/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await api.put(`/posts/${id}`, data)
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Erreur update')
  }
})

export const deletePost = createAsyncThunk('posts/delete', async (id, thunkAPI) => {
  try {
    await api.delete(`/posts/${id}`)
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Erreur suppression')
  }
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })

      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.selected = action.payload 
        state.loading = false
        
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.items = state.items.map(p => p.id === action.payload.id ? action.payload : p)
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload)
      })
  }
})

export const { clearSelectedPost } = postsSlice.actions
export default postsSlice.reducer
