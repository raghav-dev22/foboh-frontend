import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  businessName: "",
  abn: "",
  liquorLicence: "",
  deliveryAddress: "",
  apartment: "",
  suburb: "",
  postcode: "",
  notes: "",
  deliveryAddressState: "",
  firstName: "",
  lastName: "",
  mobile: "",
  orderContactState: "",
  orderingContactFirstName: "",
  orderingContactLastName: "",
  orderingContactEmail: "",
  orderingContactMobile: "",
  deliveryContactFirstName: "",
  deliveryContactLastName: "",
  deliveryContactEmail: "",
  deliveryContactMobile: "",
};

const buyerSlice = createSlice({
  name: "buyer",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetBuyer: () => initialState,
  },
});

export const { updateField, resetBuyer } = buyerSlice.actions;

export default buyerSlice.reducer;
