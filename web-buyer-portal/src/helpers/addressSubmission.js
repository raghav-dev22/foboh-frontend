export const addressSubmission = async (buyerInfo, type) => {
  const orderId = localStorage.getItem("orderId");

  let addressBody = {};
  if (type === "delivery-address") {
    addressBody = {
      orderId: orderId,
      apartmentSuite: buyerInfo?.apartment,
      streetaddress: buyerInfo?.address,
      city: buyerInfo?.suburb,
      postcode: buyerInfo?.postalCode,
      state: buyerInfo?.state,
      addressType: type,
      instructionsNotes: buyerInfo?.deliveryNotes,
      emailId: "",
      firstname: "",
      lastname: "",
      country: "",
      phoneNumber: "",
    };
  } else if (type === "billing-address") {
    addressBody = {
      orderId: orderId,
      apartmentSuite: buyerInfo?.billingApartment,
      streetaddress: buyerInfo?.billingAddress,
      city: buyerInfo?.billingSuburb,
      postcode: buyerInfo?.billingPostalCode,
      state: buyerInfo?.billingState,
      instructionsNotes: buyerInfo?.deliveryNotes,
      addressType: type,
      emailId: "",
      firstname: "",
      lastname: "",
      country: "",
      phoneNumber: "",
    };
  } else if (type === "delivery-contact") {
    addressBody = {
      orderId: orderId,
      emailId: buyerInfo?.deliveryEmail,
      firstname: buyerInfo?.deliveryFirstName,
      lastname: buyerInfo?.deliveryLastName,
      phoneNumber: buyerInfo?.deliveryMobile,
      apartmentSuite: "",
      streetaddress: "",
      city: "",
      postcode: "",
      state: "",
      country: "",
      addressType: type,
      instructionsNotes: "",
    };
  }

  const addressSubmitResponse = await fetch(
    "https://fobohwbppaymentinfoapi20230925100153.azurewebsites.net/api/PaymentInfo/AddressSubmission_ByType",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressBody),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Data from addresspost", data);
      if (data.success) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => console.log(error));

  return addressSubmitResponse;
};
