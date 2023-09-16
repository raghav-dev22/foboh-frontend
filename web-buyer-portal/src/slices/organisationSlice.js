// organizationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  abn: "",
  apartment: "",
  billingAddress: "",
  billingAddressApartment: "",
  billingAddressPostCode: "",
  billingAddressState: "",
  billingAddressSuburb: "",
  businessName: "",
  categories: "",
  categoryList: [],
  city: "",
  country: "",
  description: "",
  isActive: true,
  liquorLicense: "",
  logisticsContactEmail: "",
  logisticsContactFirstName: "",
  logisticsContactLastName: "",
  logisticsContactMobile: "",
  orderingContactEmail: "",
  orderingContactFirstName: "",
  orderingContactLastName: "",
  orderingContactMobile: "",
  organisationAddress: "",
  organisationID: "",
  organisationlogo: "",
  postcode: "",
  state: "",
  suburb: null,
  tradingName: ""
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    updateSetting: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateSetting } = organizationSlice.actions;

export default organizationSlice.reducer;
