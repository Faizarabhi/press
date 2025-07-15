import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/authApi'

// Register
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/register', userData)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Login
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await api.post('/login', credentials)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem('token', action.payload.token)
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
