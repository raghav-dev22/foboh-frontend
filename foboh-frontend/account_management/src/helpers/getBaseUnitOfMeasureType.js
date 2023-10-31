export const getBaseUnitMeasureType = async () => {
  const baseUnitMeasureType = await fetch(
    "https://masters-api-foboh.azurewebsites.net/api/_BaseUOMType",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return baseUnitMeasureType;
};
