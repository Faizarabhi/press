import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// ✅ Tous : voir articles validés
export const fetchValidatedPosts = createAsyncThunk(
  "posts/validated",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/posts/validated");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Erreur serveur");
    }
  }
);

// 🔁 Tous : détails d’un post public validé (non authentifié)
export const fetchValidatedPostPublicById = createAsyncThunk(
  "posts/fetchValidatedPublicById",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/posts-public/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Erreur serveur");
    }
  }
);

// 🧑‍💻 Reporter : voir ses propres posts
export const fetchMyPosts = createAsyncThunk(
  "posts/my",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/posts-reporter");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Erreur serveur");
    }
  }
);

// 🧑‍🏫 Editor : voir tous les posts

export const fetchAllPosts = createAsyncThunk(
  "posts/all",
  async (filters = {}, thunkAPI) => {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v !== undefined && v !== null && v !== "") {
              params.append(`${key}[]`, v); // ✅ Important for arrays
            }
          });
        } else if (value !== undefined && value !== null && value !== "") {
          params.append(key, value);
        }
      });

      const res = await api.get(`/posts?${params.toString()}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Erreur serveur");
    }
  }
);


// 🔁 Tous : détails d’un post
export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/posts/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Erreur serveur");
    }
  }
);

// 🧑‍💻 Reporter : créer un post
export const createPost = createAsyncThunk(
  "posts/create",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/posts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Erreur création");
    }
  }
);

// 🧑‍💻 Reporter : éditer le contenu
export const updatePostContent = createAsyncThunk(
  "posts/updateContent",
  async ({ id, data }, thunkAPI) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          if (key === "image") {
            if (value === null) {
              // signaler qu'on veut supprimer l'image
              formData.append("image", "null");
            } else if (value instanceof File) {
              formData.append("image", value);
            }
            // sinon on ignore si image est vide
          } else {
            formData.append(key, value);
          }
        }
      });

      const res = await api.post(`/posts/${id}/edit-content`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Erreur mise à jour post" }
      );
    }
  }
);


// 🧑‍🏫 Editor : valider / rejeter
export const updatePostStatus = createAsyncThunk(
  "posts/updateStatus",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/posts/${id}/update-status`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur mise à jour statut"
      );
    }
  }
);
// delete
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/posts/${id}`);
      return id; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur suppression"
      );
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedPost: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchValidatedPosts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePostContent.fulfilled, (state, action) => {
        state.items = state.items.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(updatePostStatus.fulfilled, (state, action) => {
        state.items = state.items.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(fetchValidatedPostPublicById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export const { clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
