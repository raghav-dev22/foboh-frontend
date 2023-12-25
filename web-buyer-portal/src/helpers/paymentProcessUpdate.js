export const paymentProcessUpdate = async (
  orderId,
  orderBy,
  status,
  id,
  OrderPaymentIntentId
) => {
  const { organisationId } = JSON.parse(localStorage.getItem("buyerInfo"));
  await fetch(
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
        organisationID: organisationId,
        catalogueID: localStorage.getItem("catalogueId"),
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => console.log(error));
};
