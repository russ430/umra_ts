import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';

export interface RaceData {
  boathouse: string;
  end_date: string;
  location: string;
  race_name: string;
  start_date: string;
  id: string;
}

interface InitialState {
  races: RaceData[] | null;
}

const initialState: InitialState = {
  races: null,
};

export const getRaces = createAsyncThunk('schedule/getRaces', async () => {
  const racesCollectionRef = collection(db, 'races');
  const data = await getDocs(racesCollectionRef);
  const raceData = data.docs.map((doc) => {
    const { boathouse, end_date, location, race_name, start_date } = doc.data();
    return {
      boathouse,
      end_date,
      location,
      race_name,
      start_date,
      id: doc.id,
    };
  });
  return raceData;
});

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSchedule(state, action: PayloadAction<RaceData[] | null>) {
      state.races = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRaces.fulfilled, (state, action) => {
      state.races = action.payload;
    });
  },
});

export default scheduleSlice.reducer;
