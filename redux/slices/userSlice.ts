import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
  email: string;
  grad_year: string;
  name: string;
  position: string;
  admin: Boolean;
}

interface Error {
  code: string;
  name: string;
}

interface InitialState {
  error: Error | null;
  isLoading: Boolean;
  data: UserData | null;
}

const initialState: InitialState = {
  error: null,
  isLoading: false,
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData | null>) {
      state.data = action.payload;
    },
    setError(state, action: PayloadAction<Error | null>) {
      state.error = action.payload;
    },
  },
});

export const { setError, setUser } = userSlice.actions;
export default userSlice.reducer;
