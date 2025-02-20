import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Ambil data user dari API ReqRes
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get("https://reqres.in/api/users");
  let getUsers = res.data.data;

  return getUsers;
});

export const fetchLogginUser = createAsyncThunk(
  "users/fetchLogginUser",
  async (_, { getState }) => {
    const state = getState();
    // const email = state.users.logginUser.email;
    let users = state.users.users; // Ambil daftar users dari Redux
    const email = localStorage.getItem("logginEmail");
    console.log(email);

    if (!email) throw new Error("Email tidak ditemukan di state!");

    // Jika users belum di-fetch, fetch dari API
    if (users.length === 0) {
      const res = await axios.get("https://reqres.in/api/users");
      users = res.data.data;
    }

    // Cari user dengan email yang cocok
    const user = users.find((u) => u.email === email);

    if (!user) throw new Error("User tidak ditemukan!");

    return user;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    logginUser: {},
    status: "idle", // idle | loading | succeeded | failed
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    updateUser: (state, action) => {
      const { id, email, first_name, last_name } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        existingUser.first_name = first_name;
        existingUser.last_name = last_name;
        existingUser.email = email;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    removeLogginUser: (state, action) => {
      console.log(state);
      state.logginUser = {};
      state.users = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchLogginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logginUser = action.payload;
      })
      .addCase(fetchLogginUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  removeLogginUser,
  // findAndSetLogginUser,
} = userSlice.actions;
export default userSlice.reducer;
