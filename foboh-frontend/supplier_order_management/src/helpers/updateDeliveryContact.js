export const updateDeliveryContact = async (buyerId, values) => {
  const update = await fetch(`https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/UpdateDeliveryInfo?BuyerId=${buyerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deliveryFirstName: values?.firstName,
      deliveryLastName: values?.lastName,
      deliveryMobile: values?.mobile,
      deliveryEmail: values?.email,
    }),
  }).then(response => response.json())
  .then(data => {
    if (data.success) return true;
    else false;
  }).catch(error => console.log(error))

  return update
};
