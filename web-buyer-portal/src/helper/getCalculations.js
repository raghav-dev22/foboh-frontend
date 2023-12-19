export const getCalculations = (cartList) => {
  try {
    let gst = 0;
    let wet = 0;
    let subtotal1 = 0;
    let subtotal2 = 0;
    let subtotal = 0;
    let total = 0;
    let lucUnit = 0;

    cartList?.forEach((product) => {
      const price = product.globalPrice;
      const quantity = product.quantity;
      if (
        product.subCategoryId === "SC5000" ||
        product.subCategoryId === "SC500"
      ) {
        const productSubtotal = price * quantity;
        const wetApplied = productSubtotal * 0.29;
        wet += wetApplied;
        const luc = productSubtotal + wetApplied;
        lucUnit = luc;
        const gstAppliedLuc = luc * 0.1;
        gst += gstAppliedLuc;
        subtotal1 += luc + gstAppliedLuc;
      } else {
        const productSubtotal = price * quantity;
        const gstAppliedOnNonWine = productSubtotal * 0.1;
        gst += gstAppliedOnNonWine;
        subtotal2 += productSubtotal + gstAppliedOnNonWine;
      }
      subtotal += price * quantity;
      total = subtotal1 + subtotal2;
    });
    return {
      lucUnit: parseFloat(lucUnit.toFixed(2)),
      gst: parseFloat(gst.toFixed(2)),
      wet: parseFloat(wet.toFixed(2)),
      subtotal: parseFloat(subtotal.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };
  } catch (error) {
    throw new Error("Error while processing, error: " + error);
  }
};

export const getInvoiceDataCalculations = (data, setIsWine) => {
  try {
    const dataResult = data.map((item) => {
      let gstPerItem = 0;
      let wetPerItem = null;
      let amountPerItem = 0;

      const salePrice = item?.globalPrice;
      const quantity = item?.quantity;
      const subCatId = item?.subCategoryId;
      const gst = 0.1;
      const wet = 0.29;

      const subTotal = salePrice * quantity;
      const subTotalGst = subTotal * gst;
      const subTotalIncGst = subTotal + subTotalGst;
      let subTotalWet = 0;
      let subTotalIncWet = 0;

      if (subCatId === "SC500" || subCatId === "SC5000") {
        setIsWine(true);
        subTotalWet = subTotal * wet;
        subTotalIncWet = subTotal + subTotalWet;
        wetPerItem = subTotalIncWet;
      }

      amountPerItem = subTotalIncGst;
      gstPerItem = subTotalGst;

      return {
        totalPrice: item?.totalPrice,
        quantity: item?.quantity,
        cartId: item?.cartId,
        subTotalPrice: item?.subTotalPrice,
        shippingcharges: item?.shippingcharges,
        gst: item?.gst,
        wet: item?.wet,
        productId: item?.productId,
        skUcode: item?.skUcode,
        configuration: item?.configuration,
        luCcost: item?.luCcost?.toFixed(2),
        globalPrice: item?.globalPrice,
        title: item?.title,
        unitofMeasure: item?.unitofMeasure,
        amountPerItem: amountPerItem?.toFixed(2),
        gstPerItem: gstPerItem?.toFixed(2),
        wetPerItem: wetPerItem?.toFixed(2),
      };
    });

    return dataResult;
  } catch (error) {
    throw new Error("Error occurred while processing.");
  }
};
