import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

// 🧑‍🏫 Editor : récupérer toutes les catégories
export const fetchCategories = createAsyncThunk('categories/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await api.get('/categories')
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Erreur récupération catégories')
  }
})

// 🧑‍🏫 Editor : créer une catégorie
export const createCategory = createAsyncThunk('categories/create', async (data, thunkAPI) => {
  try {
    const res = await api.post('/categories', data)
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Erreur création catégorie')
  }
})

// 🧑‍🏫 Editor : mettre à jour une catégorie
export const updateCategory = createAsyncThunk('categories/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await api.put(`/categories/${id}`, data)
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Erreur mise à jour catégorie')
  }
})

// 🧑‍🏫 Editor : supprimer une catégorie
export const deleteCategory = createAsyncThunk('categories/delete', async (id, thunkAPI) => {
  try {
    await api.delete(`/categories/${id}`)
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Erreur suppression catégorie')
  }
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // createCategory
      .addCase(createCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.loading = false
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // updateCategory
      .addCase(updateCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.items = state.items.map(cat => 
          cat.id === action.payload.id ? action.payload : cat
        )
        state.loading = false
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(cat => cat.id !== action.payload)
        state.loading = false
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default categoriesSlice.reducer
