export const updateBillingAddress = async (buyerId, values) => {
  const update = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/UpdateBillingAddressInfo?BuyerId=${buyerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        billingStreetaddress: values?.address,
        billingApartmentSuite: values?.apartment,
        billingCity: values?.suburb,
        billingPostcode: values?.postCode,
        billingState: values?.state?.label,
        billingSuburb: values?.suburb,
        billingCountry: "Australia",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    })
    .catch((error) => console.log(error));

  return update;
};
