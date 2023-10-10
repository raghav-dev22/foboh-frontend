export const paymentProcess = async (
  paymentMethodID,
  paymentType,
  paymentMethod,
  email,
  orderId,
  orderBy
) => {
  const { gst, wt, subTotal, total } = await getCalculations();

  fetch(
    "https://fobohwbppaymentinfoapi20230925100153.azurewebsites.net/api/PaymentInfo/ProcessPayment_PayType_PayMethod",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        orderId: orderId,
        orderByEmailID: email,
        orderBy: orderBy,
        orderStatus: "inProcess",
        paymentType: paymentType,
        paymentMethod: paymentMethod,
        paymentMethodID: paymentMethodID,
        transactionId: "",
        transactionStatus: "",
        totalPrice: subTotal,
        gst: gst,
        wt: wt,
        paymentAmount: "",
        payAmountLong: total,
        couponDiscount: "",
        couponKey: "",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("payment-response", data);
    })
    .catch((error) => console.log(error));
};

// Handling all the products Pricing
const getCalculations = async () => {
  const cartId = localStorage.getItem("cartId");

  const calculations = await fetch(
    `https://buyerwebportalfoboh-fbh.azurewebsites.net/api/Product/getAddToCartByCartId?CartId=${cartId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "addcart");
      let wetTotal = 0;
      let remainingTotal = 0;
      let totalCost = 0;
      let alltotal = 0;
      let subCatList = [];
      let subTotal = 0;
      let gstIncluded = 0;
      let calculations = {};

      if (data.success) {
        data.data.forEach((item) => {
          // For managing wet calculation
          subCatList.push(item.subCategoryId);
          console.log("subCatList", subCatList);

          // Managing all the calculations
          const productPrice = item?.buyPrice || 0;
          const subCat = item?.subCategoryId;
          const quantity = item?.quantity || 0;
          alltotal += productPrice * quantity;

          subTotal = parseFloat(alltotal.toFixed(2));

          const wetTaxAmount =
            subCat === "SC500" || subCat === "SC5000" ? productPrice * 0.29 : 0;

          const totalCostForItem = (productPrice + wetTaxAmount) * quantity;

          if (subCat === "SC500" || subCat === "SC5000") {
            wetTotal += totalCostForItem;
          } else {
            remainingTotal += totalCostForItem;
          }

          totalCost = wetTotal + remainingTotal;
          totalCost += totalCost * 0.1;
          gstIncluded = parseFloat(totalCost.toFixed(2));

          const newTotal = parseFloat(totalCost.toFixed(2));

          console.log(
            gstIncluded,
            parseFloat(wetTotal.toFixed(2)),
            subTotal,
            newTotal
          );

          calculations = {
            gst: gstIncluded,
            wt: wetTotal,
            subTotal: subTotal,
            total: newTotal,
          };
        });
      } else {
        subTotal = 0;
        totalCost = 0;
        gstIncluded = 0;
        wetTotal = 0;
        calculations = {
          gst: gstIncluded,
          wt: wetTotal,
          subTotal: subTotal,
          total: totalCost,
        };
      }
      return calculations;
    })
    .catch((error) => console.log(error));

  return calculations;
};
