export const setBuyerValues = (buyer, dispatch, updateField) => {
  dispatch(
    updateField({
      name: buyer?.businessName,
      email: buyer?.deliveryEmail,
      password: "",
      brn: buyer?.brn,
      cbrn: buyer?.cbrn,
      businessName: buyer?.businessName,
      abn: buyer?.abn,
      liquorLicence: buyer?.liquorLicence,
      deliveryAddress: buyer?.address,
      apartment: buyer?.apartment,
      suburb: buyer?.suburb,
      postcode: buyer?.postalCode,
      notes: buyer?.deliveryNotes,
      deliveryAddressState: buyer?.state,
      firstName: buyer?.deliveryFirstName,
      lastName: buyer?.deliveryLastName,
      mobile: buyer?.mobile,
      organisationId: buyer?.organisationId,
      orderContactState: buyer?.orderingState,
      orderingContactFirstName: buyer?.orderingFirstName,
      orderingContactLastName: buyer?.orderingLastName,
      orderingContactEmail: buyer?.orderingEmail,
      orderingContactMobile: buyer?.orderingMobile,
      deliveryContactFirstName: buyer?.deliveryFirstName,
      deliveryContactLastName: buyer?.deliveryLastName,
      deliveryContactEmail: buyer?.deliveryEmail,
      deliveryContactMobile: buyer?.deliveryMobile,
      billingContactAddress: buyer?.billingAddress,
      billingContactApartment: buyer?.billingApartment,
      billingContactPostalCode: buyer?.billingPostalCode,
      billingContactState: buyer?.billingState,
      billingContactSuburb: buyer?.billingSuburb,
      defaultPaymentTerm: buyer?.defaultPaymentTerm[0],
      defaultPaymentMethod: buyer?.defaultPaymentMethodId[0],
    })
  );

  //   return {
  //     name: buyer?.businessName,
  //     email: buyer?.deliveryEmail,
  //     password: "",
  //     brn: buyer?.brn,
  //     cbrn: buyer?.cbrn,
  //     businessName: buyer?.businessName,
  //     abn: buyer?.abn,
  //     liquorLicence: buyer?.liquorLicence,
  //     deliveryAddress: buyer?.address,
  //     apartment: buyer?.apartment,
  //     suburb: buyer?.suburb,
  //     postcode: buyer?.postalCode,
  //     notes: buyer?.deliveryNotes,
  //     deliveryAddressState: buyer?.state,
  //     firstName: buyer?.deliveryFirstName,
  //     lastName: buyer?.deliveryLastName,
  //     mobile: buyer?.mobile,
  //     organisationId: buyer?.organisationId,
  //     orderContactState: buyer?.orderingState,
  //     orderingContactFirstName: buyer?.orderingFirstName,
  //     orderingContactLastName: buyer?.orderingLastName,
  //     orderingContactEmail: buyer?.orderingEmail,
  //     orderingContactMobile: buyer?.orderingMobile,
  //     deliveryContactFirstName: buyer?.deliveryFirstName,
  //     deliveryContactLastName: buyer?.deliveryLastName,
  //     deliveryContactEmail: buyer?.deliveryEmail,
  //     deliveryContactMobile: buyer?.deliveryMobile,
  //   };
};

export const getBuyerValues = async (buyerId) => {
  try {
    const response = await fetch(
      `https://buyeruserapi-foboh-fbh.azurewebsites.net/api/BuyerUser/getBuyerProfile?BuyerId=${buyerId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    // console.log("Buyer get response", data);
    const buyerData = data?.data[0];
    return buyerData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
