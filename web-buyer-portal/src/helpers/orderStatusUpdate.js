export const orderStatusUpdate = () => {
  const orderId = localStorage.getItem("orderId");
  const { deliveryEmail, businessName } = JSON.parse(
    localStorage.getItem("buyerInfo")
  );
  fetch(
    `https://omsupplierfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/UpdateOrderStatus?OrderId=${orderId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: businessName,
        orderId: orderId,
        orderByEmailID: deliveryEmail,
        orderStatus: "Processing",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("order status response", data);
    })
    .catch((error) => console.log(error));
};
