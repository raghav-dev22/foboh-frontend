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
  total,
  convertedPaymentDueDate,
  last4
) => {
  const payAmt = total.toString();
  const { organisationId } = JSON.parse(localStorage.getItem("buyerInfo"));
  const clientSecret = await fetch(
    "https://fobohwbppaymentinfoapi20230925100153.azurewebsites.net/api/PaymentInfo/ProcessPayment_PayType_PayMethod_PayNow",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        orderId: orderId,
        orderByEmailID: email,
        orderBy: orderBy,
        organisationID: organisationId,
        catalogueID: localStorage.getItem("catalogueId"),
        orderStatus: "InProcess",
        paymentType: paymentType,
        paymentMethod: paymentMethod,
        paymentMethodType: "PayNow",
        last4: last4,
        paymentDueDate: convertedPaymentDueDate,
        paymentMethodID: paymentMethodID,
        transactionId: "",
        transactionStatus: "",
        paymentStatus: "PayNow",
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
      let clientSecret = "";
      let OrderPaymentIntentId = "";
      if (data?.result?.success) {
        clientSecret = data?.result?.transactionConfirmationCode;
        OrderPaymentIntentId = data?.result?.data?.value[0]?.transactionId;
        return { clientSecret, OrderPaymentIntentId };
      }
      return { clientSecret, OrderPaymentIntentId };
    })
    .catch((error) => console.log(error));

  return clientSecret;
};
