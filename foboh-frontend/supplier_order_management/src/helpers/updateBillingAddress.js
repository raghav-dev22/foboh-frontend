export const updateBillingAddress = async (buyerId, values) => {
  const update = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/UpdateBillingAddressInfo?BuyerId=${buyerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        billingAddress: values?.address,
        billingApartment: values?.apartment,
        billingSuburb: values?.suburb,
        billingPostalCode: values?.postCode,
        billingState: values?.state?.label,
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
