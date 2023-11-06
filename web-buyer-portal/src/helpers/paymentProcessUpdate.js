export const paymentProcessUpdate = (orderId, orderBy, status, pi_id) => {
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
        orderStatus: "New",
        TransactionStatus: "Paid",
        OrderPaymentIntentId: pi_id,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("paymentProcessUpdate", data);
    })
    .catch((error) => console.log(error));
};
