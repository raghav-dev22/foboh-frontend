export const getClientSecret = async (details) => {
  try {
    const response = await fetch(
      `https://fobohwbppaymentinfoapi20230925100153.azurewebsites.net/api/PaymentInfo/ProcessPayment_PayType_PayMethod_PayLater_BCSE_SetUp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
