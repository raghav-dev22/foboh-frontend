import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  cbrn: "",
  brn: "",
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
  organisationId: "",
  orderContactState: "",
  orderingContactFirstName: "",
  orderingContactLastName: "",
  orderingContactEmail: "",
  orderingContactMobile: "",
  deliveryContactFirstName: "",
  deliveryContactLastName: "",
  deliveryContactEmail: "",
  deliveryContactMobile: "",
  billingContactAddress: "",
  billingContactApartment: "",
  billingContactPostalCode: "",
  billingContactState: "",
  billingContactSuburb: "",
  defaultPaymentTerm: '',
  defaultPaymentMethod: '',
};

const buyerSlice = createSlice({
  name: "buyer",
  initialState,
  reducers: {
    updateField: (state, action) => {
      // Merge the action payload with the current state to update multiple fields at once
      Object.assign(state, action.payload);
    },
    resetBuyer: () => initialState,
  },
});

export const { updateField, resetBuyer } = buyerSlice.actions;

export default buyerSlice.reducer;
