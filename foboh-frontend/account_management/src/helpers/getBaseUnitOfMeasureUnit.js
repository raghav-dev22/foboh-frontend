export const baseUnitMeasureUnit = async () => {
  const baseUnitOfMeasure = await fetch(
    "https://masters-api-foboh.azurewebsites.net/api/BaseUOM",
    {
      method: "GET",
    }
  )
    .then((resposne) => resposne.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return baseUnitOfMeasure;
};
