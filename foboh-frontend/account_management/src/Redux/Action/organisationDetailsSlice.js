import { createSlice } from "@reduxjs/toolkit";

const organisationDetailsSlice = createSlice({
  name: "organisationDetails",
  initialState: {
    tradingName: "",
    businessName: "",
    abn: "",
    liquorLicence: "",
    description: "",
  },
  reducers: {
    setTradingName: (state, action) => {
      state.tradingName = action.payload;
    },
    setbusinessName: (state, action) => {
      state.businessName = action.payload;
    },
    setAbn: (state, action) => {
      state.abn = action.payload;
    },
    setLiquorLicence: (state, action) => {
      state.liquorLicence = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setTradingName, setbusinessName, setAbn, setLiquorLicence, setDescription } = organisationDetailsSlice.actions;

export default organisationDetailsSlice.reducer;
