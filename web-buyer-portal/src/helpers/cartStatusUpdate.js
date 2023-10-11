export const cartStatusUpdate = () => {
  const cartId = localStorage.getItem("cartId");
  const { buyerId, deliveryFirstName } = JSON.parse(
    localStorage.getItem("buyerInfo")
  );

  fetch(
    `https://buyerwebportalfoboh-fbh.azurewebsites.net/api/Product/UpdateToCartStatusByCartId?CartId=${cartId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: deliveryFirstName,
        cartId: cartId,
        buyerId: buyerId,
        productStatus: "sealed",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("cartStatusUpdate", data);
    })
    .catch((error) => console.log(error));
};
