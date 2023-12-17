export const getStates = async () => {
  try {
    const response = await fetch(
      "https://masters-api-foboh.azurewebsites.net/api/State",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
