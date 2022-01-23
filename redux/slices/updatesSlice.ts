import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';

export interface UpdateData {
  author: string;
  body: string;
  date: string;
  position: string;
  id: string;
}

interface InitialState {
  data: UpdateData[] | null;
}

const initialState: InitialState = {
  data: null,
};

export const getUpdates = createAsyncThunk('updates/getUpdates', async () => {
  const racesCollectionRef = collection(db, 'updates');
  const data = await getDocs(racesCollectionRef);
  const updateData = data.docs.map((doc) => {
    const { author, body, date, position } = doc.data();
    return {
      author,
      body,
      date,
      position,
      id: doc.id,
    };
  });
  return updateData;
});

const updatesSlice = createSlice({
  name: 'updates',
  initialState,
  reducers: {
    setSchedule(state, action: PayloadAction<UpdateData[] | null>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUpdates.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default updatesSlice.reducer;
