export const getDefaultPaymentTerms = async () => {
  const defaultPaymentTerms = await fetch(
    "https://masters-api-foboh.azurewebsites.net/api/DefaultPaymentTerm",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return defaultPaymentTerms;
};
