export const postBuyerDetails = async (buyer) => {
  const defaultPaymentTermValue = await getDefaultPaymentTermValue(
    buyer?.defaultPaymentTerm
  );

  const buyerDetails = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/CreateOrderInfo?BuyerId=${buyer?.buyerId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: buyer?.deliveryFirstName,
        abn: buyer?.abn,
        defaultPaymentTerm: [defaultPaymentTermValue],
        shippingcharges: 0,
        buyerId: buyer?.buyerId,
        businessName: buyer?.businessName,
        orderingFirstName: buyer?.orderingFirstName,
        orderingLastName: buyer?.orderingLastName,
        orderingMobile: buyer?.orderingMobile,
        orderingEmail: buyer?.orderingEmail,
        deliveryFirstName: buyer?.deliveryFirstName,
        deliveryLastName: buyer?.deliveryLastName,
        deliveryMobile: buyer?.deliveryMobile,
        deliveryEmail: buyer?.deliveryEmail,
        address: buyer?.address,
        apartment: buyer?.apartment,
        suburb: buyer?.suburb,
        state : buyer?.state,
        postalCode: buyer?.postalCode,
        deliveryNotes: buyer?.deliveryNotes,
        billingAddress: buyer?.billingAddress,
        billingApartment: buyer?.billingApartment,
        billingSuburb: buyer?.billingSuburb,
        billingPostalCode: buyer?.billingPostalCode,
        billingState: buyer?.billingState,
        pricing: 0,
        freight: 0,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return buyerDetails;
};

const getDefaultPaymentTermValue = async (defaultPaymentTerms) => {
  let defaultPaymentTermList = [];

  defaultPaymentTerms.forEach((item) => {
    if (
      item === " 7 days from invoice date" ||
      item === " 15 days from invoice date" ||
      item === " 30 days from invoice date" ||
      item === " 45 days from invoice date" ||
      item === " 60 days from invoice date" ||
      item === " 90 days from invoice date" ||
      item === " 30 days from end of month"
    ) {
        defaultPaymentTermList.push(item)
    }
  });

  return defaultPaymentTermList[0]
};
