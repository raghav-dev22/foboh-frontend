export const updateDefaultPaymentTerms = async (
  buyerId,
  defaultPaymentTerm,
  shippingcharges
) => {
  const update = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/UpdatePaymentInfo?BuyerId=${buyerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        defaultPaymentTerm: [defaultPaymentTerm],
        shippingcharges: shippingcharges,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else false;
    })
    .catch((error) => console.log(error));

  return update;
};
