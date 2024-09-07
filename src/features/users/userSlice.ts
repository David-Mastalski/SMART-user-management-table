import { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return data.map((user: User) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
  }));
});

interface FiltersState {
  name: string;
  username: string;
  phone: string;
  email: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface Users {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  filters: FiltersState;
}

const initialState: Users = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  filters: {
    name: "",
    username: "",
    phone: "",
    email: "",
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FiltersState>) {
      state.filters = action.payload;
      state.filteredUsers = state.users.filter(
        (user) =>
          (state.filters.name
            ? user.name
                .toLowerCase()
                .includes(state.filters.name.toLocaleLowerCase())
            : true) &&
          (state.filters.username
            ? user.username
                .toLocaleLowerCase()
                .includes(state.filters.username.toLocaleLowerCase())
            : true) &&
          (state.filters.phone
            ? user.phone
                .toLocaleLowerCase()
                .startsWith(state.filters.phone.toLocaleLowerCase())
            : true) &&
          (state.filters.email
            ? user.email
                .toLocaleLowerCase()
                .includes(state.filters.email.toLocaleLowerCase())
            : true)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch data";
      });
  },
});

export const selectFilteredUsers = (state: RootState) =>
  state.users.filteredUsers;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectError = (state: RootState) => state.users.error;
export const selectFilters = (state: RootState) => state.users.filters;

export const { setFilters } = usersSlice.actions;
export default usersSlice.reducer;
