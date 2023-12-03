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
      let gst = 0;
      let wet = 0;
      let subtotal1 = 0;
      let subtotal2 = 0;
      let total = 0;
      let lucUnit = 0;

      const price = item.globalPrice;
      const quantity = item.quantity;

      if (item?.subCategoryId === "SC500" || item?.subCategoryId === "SC5000") {
        setIsWine(true);
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

      total = subtotal1 + subtotal2;

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
        luCcost: lucUnit.toFixed(2),
        globalPrice: item?.globalPrice,
        title: item?.title,
        unitofMeasure: item?.unitofMeasure,
        amountPerItem: total.toFixed(0),
        gstPerItem: gst.toFixed(2),
        wetPerItem: wet.toFixed(2),
      };
    });

    return dataResult;
  } catch (error) {
    throw new Error("Error occurred while processing.");
  }
};
