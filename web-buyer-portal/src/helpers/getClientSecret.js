export const getClientSecret = async (details) => {
  try {
    const response = await fetch(
      `https://fobohwbppaymentinfoapi20230925100153.azurewebsites.net/api/PaymentInfo/ProcessPayment_PayType_PayMethod_PayLater`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result.success) return data.result.transactionConfirmationCode;
        else throw new Error("Error occurred while getting client secret!");
      })
      .catch((err) => console.log(err));
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
