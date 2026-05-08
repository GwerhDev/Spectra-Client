import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Session } from '@/interfaces';

const initialState: Session = {
  logged: false,
  userData: { loader: true },
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (_state, action: PayloadAction<Session>) => action.payload,
    clearSession: () => {
      window.location.href = '/unauthorized';
      return { logged: false, userData: { loader: true } };
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.userData.loader = action.payload;
    },
  },
});

export const { setSession, clearSession, setLoader } = sessionSlice.actions;
export default sessionSlice.reducer;
