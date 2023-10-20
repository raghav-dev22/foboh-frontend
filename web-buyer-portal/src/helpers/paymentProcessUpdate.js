export const paymentProcessUpdate = (orderId, orderBy) => {
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
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("paymentProcessUpdate", data);
    })
    .catch((error) => console.log(error));
};
