export const paymentProcessUpdate = (
  orderId,
  orderBy,
  status,
  id,
  OrderPaymentIntentId
) => {
  fetch(
    "https://fobohwbppaymentinfoapi20230925100153.azurewebsites.net/api/PaymentInfo/OrderMain_InProcessToDeliveredStatusUpdation",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        orderBy: orderBy,
        orderStatus: "OrderPlaced",
        paymentStatus: status,
        orderPaymentIntentId: id,
        organisationID: localStorage.getItem("organisationId"),
        catalogueID: localStorage.getItem("catalogueId"),
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("paymentProcessUpdate", data);
    })
    .catch((error) => console.log(error));
};
