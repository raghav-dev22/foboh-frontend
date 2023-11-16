export const paymentProcess = async (
  paymentMethodID,
  paymentType,
  paymentMethod,
  email,
  orderId,
  orderBy,
  gst,
  wet,
  subtotal,
  total
) => {
  const payAmt = total.toString();

  const clientSecret = await fetch(
    "https://fobohwbppaymentinfoapi20230925100153.azurewebsites.net/api/PaymentInfo/AProcessPayment_PayType_PayMethod_PayNow",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        orderId: orderId,
        orderByEmailID: email,
        orderBy: orderBy,
        orderStatus: "InProcess",
        paymentType: paymentType,
        paymentMethod: paymentMethod,
        paymentMethodID: paymentMethodID,
        transactionId: "",
        transactionStatus: "",
        totalPrice: subtotal,
        gst: gst,
        wt: wet,
        paymentAmount: payAmt,
        payAmountLong: total,
        couponDiscount: "",
        couponKey: "",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("payment-response", data);
      let clientSecret = "";
      if (data?.result?.success) {
        clientSecret = data?.result?.transactionConfirmationCode;
        return clientSecret;
      }
      return clientSecret;
    })
    .catch((error) => console.log(error));

  return clientSecret;
};
