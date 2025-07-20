import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

// 🔄 Fetch authors (reporters)
export const fetchAuthors = createAsyncThunk(
  'users/fetchAuthors',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/authors')
      console.log(res.data)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Erreur serveur')
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: {
    authors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.loading = false
        state.authors = action.payload
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default userSlice.reducer
