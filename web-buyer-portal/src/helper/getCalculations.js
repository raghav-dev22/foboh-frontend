export const getCalculations = (cartList) => {
  try {
    let gst = 0;
    let wet = 0;
    let subtotal1 = 0;
    let subtotal2 = 0;
    let subtotal = 0;
    let total = 0;

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
        const gstAppliedLuc = luc * 0.1;
        gst += gstAppliedLuc;
        subtotal1 += luc + gstAppliedLuc;
      } else {
        const productSubtotal = price * quantity;
        const gstAppliedOnNonWine = productSubtotal * 0.1;
        gst += gstAppliedOnNonWine;
        subtotal2 += productSubtotal + gstAppliedOnNonWine;

        subtotal += productSubtotal;

        total += subtotal1 + subtotal2;
      }
    });
    return [
      gst.toFixed(2),
      wet.toFixed(2),
      subtotal.toFixed(2),
      total.toFixed(2),
    ];
  } catch (error) {
    throw new Error("Error while processing, error: " + error);
  }
};
