export const addressUpdate = async (values, type) => {
  const orderId = localStorage.getItem("orderId");

  let addressBody = {};

  if (type === "delivery-contact") {
    addressBody = {
      orderId: orderId,
      emailId: values?.email,
      firstname: values?.FirstName,
      lastname: values?.LastName,
      company: "",
      apartmentSuite: "",
      streetaddress: "",
      city: "",
      postcode: "",
      state: "",
      country: "",
      phoneNumber: values?.Mobile,
      addressType: type,
      instructionsNotes: "",
    };
  } else if (type === "delivery-address") {
    addressBody = {
      orderId: orderId,
      emailId: "",
      firstname: "",
      lastname: "",
      company: "",
      apartmentSuite: values?.Apartment,
      streetaddress: values?.Address,
      city: values?.Suburb,
      postcode: values?.Postcode,
      state: values?.State?.label,
      country: "",
      phoneNumber: "",
      addressType: type,
      instructionsNotes: values?.Notes,
    };
  } else if (type === "billing-address") {
    addressBody = {
      orderId: orderId,
      emailId: "",
      firstname: "",
      lastname: "",
      company: "",
      apartmentSuite: values?.Apartment,
      streetaddress: values?.Address,
      city: values?.Suburb,
      postcode: values?.Postcode,
      state: values?.State?.label,
      country: "",
      phoneNumber: "",
      addressType: type,
      instructionsNotes: values?.Notes,
    };
  }

  fetch(
    "https://fobohwbppaymentinfoapi20230925100153.azurewebsites.net/api/PaymentInfo/AddressUpdation_ByType",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressBody),
    }
  )
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => console.log(error));
};
