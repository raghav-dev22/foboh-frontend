import { getCartList } from "./getCartList";

export const getCalculations = async () => {
  const cartList = await getCartList();

  let wetTotal = 0;
  let remainingTotal = 0;
  let totalCost = 0;
  let alltotal = 0;
  let subCatList = [];
  let subTotal = 0;
  let gstIncluded = 0;
  let calculations = {};

  if (cartList) {
    cartList.forEach((item) => {
      subCatList.push(item.subCategoryId);
      console.log("subCatList", subCatList);

      // Managing all the calculations
      const productPrice = item?.globalPrice || 0;
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

      calculations = {
        gst: gstIncluded,
        wt: parseFloat(wetTotal.toFixed(2)),
        subTotal: subTotal,
        total: newTotal,
      };
    });
  } else {
    calculations = {
      gst: 0,
      wt: 0,
      subTotal: 0,
      total: 0,
    };
  }

  return calculations;
};
