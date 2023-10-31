export const updateCartStatus = async (customerDetails) => {
  const cartId = localStorage.getItem("cartId");
  const status = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/UpdateToCartStatusByCartId?CartId=${cartId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: customerDetails?.businessName,
        cartId: cartId,
        buyerId: customerDetails?.buyerId,
        productStatus: "sealed",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    })
    .catch((error) => console.log(error));

  return status;
};
