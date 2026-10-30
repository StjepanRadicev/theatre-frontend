// src/redux/slices/seatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/api";

export const fetchPerformanceSeats = createAsyncThunk(
  "performanceSeats/fetchPerformanceSeats",
  async (performanceId) => {
    const response = await api.get( `/public/performance/${performanceId}/seat` );

    

    return response.data;
  }
);

const seatReducer = createSlice({
  name: "performanceSeats",
  initialState: {
    performanceSeats: [],
    selectedSeats: [],
    loading: false,
    error: null,
  },
  reducers: {
   toggleSeat: (state, action) => {
  const performanceSeat = action.payload;

  const exists = state.selectedSeats.find(
    (s) => s.performanceSeatId === performanceSeat.performanceSeatId
  );

  if (exists) {
    state.selectedSeats = state.selectedSeats.filter(
      (s) => s.performanceSeatId !== performanceSeat.performanceSeatId
    );
  } else {
    state.selectedSeats.push(performanceSeat);
  }
},
    clearSelectedSeats: (state) => {
      state.selectedSeats = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformanceSeats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPerformanceSeats.fulfilled, (state, action) => {
        
        
        state.loading = false;
        state.performanceSeats = action.payload;
      })
      .addCase(fetchPerformanceSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleSeat, clearSelectedSeats } = seatReducer.actions;
export default seatReducer.reducer;