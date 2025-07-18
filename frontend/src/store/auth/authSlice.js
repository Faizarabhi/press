import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

// ✅ LOGIN
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const res = await api.post('/login', credentials)
    const { authorization, user } = res.data

    localStorage.setItem('token', authorization.token)
    localStorage.setItem('user', JSON.stringify(user))

    return { token: authorization.token, user }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Erreur login')
  }
})

// ✅ REGISTER
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const res = await api.post('/register', userData)
    const { authorization, user } = res.data

    localStorage.setItem('token', authorization.token)
    localStorage.setItem('user', JSON.stringify(user))

    return { token: authorization.token, user }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Erreur inscription')
  }
})

// ✅ GET USER FROM LOCALSTORAGE
const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user')) || null
  } catch {
    return null
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getStoredUser(),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
      })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
