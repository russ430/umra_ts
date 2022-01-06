import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../../firebase';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface User {
  admin: Boolean;
  email: string;
  grad_year: Number;
  id: string;
  name: string;
  position: string;
}

interface InitialState {
  error: Object | null;
  isLoading: Boolean;
  user: User | {};
}

export const getUser = createAsyncThunk(
  'user/getUser',
  async (userId: string) => {
    const docRef = doc(db, `users/${userId}`);
    const docSnap = await getDoc(docRef);
    return { ...docSnap.data(), id: userId } as User;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    { email, password }: { email: string; password: string },
    thunkApi
  ) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        thunkApi.dispatch(setUser(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
);

export const getOnAuthStateChanged = createAsyncThunk(
  'user/onAuthStateChanged',
  async (_, thunkApi) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        thunkApi.dispatch(setUser(user));
      } else {
        thunkApi.dispatch(setUser({}));
      }
    });
  }
);

const initialState: InitialState = {
  error: null,
  isLoading: false,
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
