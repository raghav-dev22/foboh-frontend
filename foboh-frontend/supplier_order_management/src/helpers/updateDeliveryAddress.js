export const updateDeliveryAddress = async (buyerId, values) => {
  const update = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/UpdateDeliveryAddressInfo?BuyerId=${buyerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: values?.address,
        apartment: values?.apartment,
        suburb: values?.suburb,
        postalCode: values?.postCode,
        state: values?.state?.label,
        deliveryNotes: values?.notes,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else false;
    })
    .catch((error) => console.log(error));

    return update
};
