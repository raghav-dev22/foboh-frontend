export function removeDollarAndConvertToInteger(priceWithDollar) {
  // Remove the "$" character and any non-digit characters (e.g., commas)
  const cleanedPrice = priceWithDollar.replace(/[^0-9.]/g, "");

  // Parse the cleaned string as a floating-point number (float)
  const floatValue = parseFloat(cleanedPrice);

  // Convert the float to an integer (rounding down)

  return floatValue;
}
