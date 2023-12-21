export const orderStatusUpdate = async () => {
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
        orderStatus: "New",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => console.log(error));
};
